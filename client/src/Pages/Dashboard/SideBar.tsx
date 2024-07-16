import { BookCheckIcon, FolderGit2Icon, LayoutDashboardIcon, LineChart, ListTodoIcon, Settings } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
const SideBar = () => {
	const location = useLocation()
	const isActive = (path: string) => location.pathname === path
	return (
		<TooltipProvider>
			<aside className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background md:flex'>
				<nav className='flex flex-col items-center gap-4 px-2 sm:py-5'>
					<Link
						to='#'
						className='group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base'
					>
						<BookCheckIcon className='h-4 w-4 transition-all group-hover:scale-110' />
						<span className='sr-only'>Acme Inc</span>
					</Link>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								to='/dashboard/overview'
								className={` ${isActive('/dashboard/overview') ? 'bg-accent text-white' : ''}text-muted-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8`}
							>
								<LayoutDashboardIcon className='h-5 w-5' />
								<span className='sr-only'>Dashboard</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side='right'>Dashboard</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								to='/dashboard/alltasks'
								className={` ${isActive('/dashboard/alltasks') ? 'bg-accent text-white' : ''}text-muted-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8`}
							>
								<ListTodoIcon className='h-5 w-5' />
								<span className='sr-only'>All Tasks</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side='right'>All Tasks</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								to='/dashboard/projects'
								className={` ${isActive('/dashboard/projects') ? 'bg-accent text-white' : ''}text-muted-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8`}
							>
								<FolderGit2Icon className='h-5 w-5' />
								<span className='sr-only'>Projects</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side='right'>Projects</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								to='/dashboard/analytics'
								className={` ${isActive('/dashboard/analytics') ? 'bg-accent text-white' : ''}text-muted-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8`}
							>
								<LineChart className='h-5 w-5' />
								<span className='sr-only'>Analytics</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side='right'>Analytics</TooltipContent>
					</Tooltip>
				</nav>
				<nav className='mt-auto flex flex-col items-center gap-4 px-2 sm:py-5'>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant='ghost' size='icon'>
								<Settings className='h-5 w-5' />
								<span className='sr-only'>Settings</span>
							</Button>
						</TooltipTrigger>
						<TooltipContent side='right'>Settings</TooltipContent>
					</Tooltip>
				</nav>
			</aside>
		</TooltipProvider>
	)
}

export default SideBar
