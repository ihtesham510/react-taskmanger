import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { CircleCheckIcon, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { rabinKarpSearch } from '@/lib/stringMatchAlgo'
import { TProject } from '@/lib/types'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
interface Props {
	projects: TProject[] | undefined
}
const Projects: React.FC<Props> = ({ projects }) => {
	const [search, setSearch] = useState<string | undefined>()
	const matchProject = (name: string, description: string, search: string) => {
		const titleMatches = rabinKarpSearch(name, search)
		if (!titleMatches) return rabinKarpSearch(description, search)
		return titleMatches
	}
	const filteredData = useMemo(() => {
		return projects?.filter(project => (search ? matchProject(project.name, project.description, search) : project))
	}, [search])

	return (
		<Card className='m-2 h-screen lg:h-full lg:w-[50%]'>
			<CardHeader>
				<CardTitle className='py-2 text-3xl'>Projects</CardTitle>
				<CardDescription>Search Through your Projects</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='relative'>
					<Search className='absolute left-2 top-3 h-4 w-4 text-muted-foreground' />
					<Input
						value={search}
						onChange={e => setSearch(e.target.value)}
						placeholder='Search'
						className='pl-8'
					/>
				</div>
				<ScrollArea className='h-[457px]'>
					{projects &&
						filteredData?.map((project, index) => {
							if (project.tasks) {
								const noOfCompletedTasks = project.tasks.filter(t => t.status === 'completed').length
								const noOfOngoingTasks = project.tasks.filter(t => t.status === 'ongoing').length
								const noOfTodoTasks = project.tasks.filter(t => t.status === 'todo').length
								const noOfCancelledTasks = project.tasks.filter(t => t.status === 'cancelled').length
								const noOfPausedTasks = project.tasks.filter(t => t.status === 'paused').length

								return (
									<>
										<Project
											key={index}
											title={project.name}
											description={project.description}
											noOfCompleted={noOfCompletedTasks === 0 ? undefined : noOfCompletedTasks}
											noOfTodos={noOfTodoTasks === 0 ? undefined : noOfTodoTasks}
											noOfOngoing={noOfOngoingTasks === 0 ? undefined : noOfOngoingTasks}
											noOfCancelled={noOfCancelledTasks === 0 ? undefined : noOfCancelledTasks}
											noOfPaused={noOfPausedTasks === 0 ? undefined : noOfPausedTasks}
											noTasks={project.tasks?.length === 0}
											tags={project.hashTags}
										/>
									</>
								)
							}
						})}
				</ScrollArea>
			</CardContent>
		</Card>
	)
}
interface Project {
	title: string
	description: string
	noOfTodos?: number
	noOfCancelled?: number
	noOfOngoing?: number
	noOfCompleted?: number
	noOfPaused?: number
	noTasks: boolean
	tags?: string[]
}
function Project({
	title,
	description,
	noOfTodos,
	noOfPaused,
	noOfCancelled,
	noOfOngoing,
	noOfCompleted,
	noTasks,
	tags,
}: Project) {
	return (
		<div className='my-2 max-h-max max-w-full rounded-md bg-primary-foreground p-1'>
			<span className='m-4 mb-2 flex flex-col-reverse gap-3'>
				<h1 className='text-2xl'>{title}</h1>
				<span className='flex gap-3'>
					{noOfCompleted && (
						<Badge className='flex h-max w-max cursor-pointer items-center justify-center gap-1 bg-chart1 text-white'>
							<p>{noOfCompleted}</p>
							<p>Completed</p>
						</Badge>
					)}
					{noOfOngoing && (
						<Badge className='flex h-max w-max cursor-pointer items-center justify-center gap-1 bg-chart2 text-white'>
							<p>{noOfOngoing}</p>
							<p>OnGoing</p>
						</Badge>
					)}
	{noOfTodos && (
						<Badge className='flex h-max w-max cursor-pointer items-center justify-center gap-1 bg-chart3 text-white'>
							<p>{noOfTodos}</p>
							<p>Todos</p>
						</Badge>
					)}
					{noOfCancelled && (
						<Badge className='flex h-max w-max cursor-pointer items-center justify-center gap-1 bg-chart4 text-white'>
							<p>{noOfCancelled}</p>
							<p>Cancelled</p>
						</Badge>
					)}
					{noOfPaused && (
						<Badge className='flex h-max w-max cursor-pointer items-center justify-center gap-1 bg-chart5 text-white'>
							<p>{noOfPaused}</p>
							<p>Paused</p>
						</Badge>
					)}
					{noTasks && (
						<Badge className='flex h-max w-max cursor-pointer items-center justify-center gap-1'>
							<p>No Tasks</p>
						</Badge>
					)}
				</span>
			</span>
			<p className='m-4 text-wrap text-sm text-muted-foreground'>{description}</p>
			{tags &&
				tags?.map((tag, index) => {
					if (index === 4) return
					return (
						<>
							<div className='mx-2 mb-3 flex'>
								<Tag title={tag} />
							</div>
						</>
					)
				})}
		</div>
	)
}
function Tag({ title }: { title: string }) {
	return (
		<p className='m-1 size-max rounded-md bg-primary p-1 text-xs font-semibold text-primary-foreground'>{title}</p>
	)
}

export default Projects
