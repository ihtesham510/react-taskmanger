import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { LoaderCircleIcon, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import useFetchProjects from '@/Hooks/useFetchProjects'

const Projects = () => {
	const { data, isLoading, isError } = useFetchProjects()
	const navigate = useNavigate()
	useEffect(() => {
		if (isError) {
			navigate('/error')
		}
	}, [isError, navigate])
	return (
		<div className='h-max w-full lg:w-[50%]'>
			<div className='m-2 rounded-md border border-border lg:m-4'>
				<span className='m-4 grid gap-2 md:m-6'>
					<h1 className='w-full text-2xl font-bold'>Projects</h1>
					<p className='text-sm text-muted-foreground'>
						Search through You Projects by Providing the titile of the project
					</p>
					<div className='relative my-2'>
						<Search className='absolute left-2 top-3 h-4 w-4 text-muted-foreground' />
						<Input placeholder='Search' className='pl-8' />
					</div>
					{isLoading && <Loader />}
					{data &&
						!isLoading &&
						data?.map((project, index) => {
							if (project.tasks) {
								const noOfCompletedTasks = project.tasks.filter(t => t.status === 'done').length
								const noOfOngoingTasks = project.tasks.filter(t => t.status === 'ongoing').length
								const noOfTodoTasks = project.tasks.filter(t => t.status === 'todo').length
								const noOfBacklogTasks = project.tasks.filter(t => t.status === 'backlog').length
								const noOfCancelledTasks = project.tasks.filter(t => t.status === 'cancelled').length
								return (
									<Project
										key={index}
										title={project.name}
										description={project.description}
										noOfCompleted={noOfCompletedTasks === 0 ? undefined : noOfCompletedTasks}
										noOfBacklog={noOfBacklogTasks === 0 ? undefined : noOfBacklogTasks}
										noOfTodos={noOfTodoTasks === 0 ? undefined : noOfTodoTasks}
										noOfOngoing={noOfOngoingTasks === 0 ? undefined : noOfOngoingTasks}
										noOfCancelled={noOfCancelledTasks === 0 ? undefined : noOfCancelledTasks}
										noTasks={project.tasks.length === 0}
									/>
								)
							}
						})}
					{data && !isLoading && data?.length === 0 && (
						<div className='size-full text-center'>
							<p className='m-9 text-xl'>No Projects</p>
						</div>
					)}
				</span>
			</div>
		</div>
	)
}
interface Project {
	title: string
	description: string
	noOfTodos?: number
	noOfCancelled?: number
	noOfOngoing?: number
	noOfBacklog?: number
	noOfCompleted?: number
	noTasks: boolean
}
function Project({
	title,
	description,
	noOfTodos,
	noOfCancelled,
	noOfOngoing,
	noOfBacklog,
	noOfCompleted,
	noTasks,
}: Project) {
	return (
		<div className='h-full w-full rounded-md bg-primary-foreground'>
			<span className='m-4 mb-2 flex items-center justify-between'>
				<h1 className='text-xl'>{title}</h1>
				<span className='flex gap-4'>
					{noOfBacklog && (
						<Badge className='flex h-max w-max cursor-pointer items-center justify-center gap-1 bg-slate-600'>
							<p>{noOfBacklog}</p>
							<p>BackLoged</p>
						</Badge>
					)}

					{noOfTodos && (
						<Badge className='flex h-max w-max cursor-pointer items-center justify-center gap-1 bg-neutral-600'>
							<p>{noOfTodos}</p>
							<p>Todos</p>
						</Badge>
					)}
					{noOfCompleted && (
						<Badge className='flex h-max w-max cursor-pointer items-center justify-center gap-1 bg-green-600'>
							<p>{noOfCompleted}</p>
							<p>Completed</p>
						</Badge>
					)}
					{noOfOngoing && (
						<Badge className='flex h-max w-max cursor-pointer items-center justify-center gap-1 bg-blue-600'>
							<p>{noOfOngoing}</p>
							<p>OnGoing</p>
						</Badge>
					)}
					{noOfCancelled && (
						<Badge className='flex h-max w-max cursor-pointer items-center justify-center gap-1 bg-red-600'>
							<p>{noOfCancelled}</p>
							<p>Cancelled</p>
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
		</div>
	)
}
function Loader() {
	return (
		<div className='flex size-full items-center justify-center'>
			<LoaderCircleIcon className='animate-spin' />
		</div>
	)
}

export default Projects
