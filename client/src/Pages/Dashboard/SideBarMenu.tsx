import { Sheet, SheetTrigger, SheetContent, SheetFooter } from '@/components/ui/sheet'
import { PropsWithChildren, useState } from 'react'
import { useTheme } from '@/Hooks/useTheme'
import {
	Package2,
	Home,
	ShoppingCart,
	Package,
	Users2,
	LineChart,
	BookCheckIcon,
	FolderGit2Icon,
	LayoutDashboardIcon,
	ListTodoIcon,
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export const SideBarMenu: React.FC<PropsWithChildren> = ({ children }) => {
	const { theme, switchTheme } = useTheme()

	const [open, setOpen] = useState<boolean>(false)
	const location = useLocation()
	const isActive = (path: string) => location.pathname === path
	const closeSheet = () => setOpen(false)
	return (
		<Sheet open={open} onOpenChange={e => setOpen(e)}>
			<SheetTrigger>{children}</SheetTrigger>
			<SheetContent side='left' className='sm:max-w-xs flex flex-col justify-between'>
				<nav className='grid gap-6 text-lg font-medium'>
					<button className='group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base'>
						<BookCheckIcon className='h-5 w-5 transition-all group-hover:scale-110' />
						<span className='sr-only'>React Taskmanger</span>
					</button>
					<Link
						onClick={closeSheet}
						to='/dashboard/overview'
						className={`${isActive('/dashboard/overview') ? 'text-foreground' : 'text-muted-foreground'} flex items-center gap-4 px-2.5  hover:text-foreground`}
					>
						<LayoutDashboardIcon className='h-5 w-5' />
            Overview
					</Link>
					<Link
						to='/dashboard/alltasks'
						onClick={closeSheet}
						className={`${isActive('/dashboard/alltasks') ? 'text-foreground' : 'text-muted-foreground'} flex items-center gap-4 px-2.5   hover:text-foreground`}
					>
						<ListTodoIcon className='h-5 w-5' />
						All Tasks
					</Link>
					<Link
						to='/dashboard/projects'
						onClick={closeSheet}
						className={`${isActive('/dashboard/projects') ? 'text-foreground' : 'text-muted-foreground'} flex items-center gap-4 px-2.5  hover:text-foreground`}
					>
						<FolderGit2Icon className='h-5 w-5' />
						Projects
					</Link>
					<Link
						to='/dashboard/analytics'
						onClick={closeSheet}
						className={`${isActive('/dashboard/analytics') ? 'text-foreground' : 'text-muted-foreground'} flex items-center gap-4 px-2.5  hover:text-foreground`}
					>
						<LineChart className='h-5 w-5' />
						Analytics
					</Link>
				</nav>
				<SheetFooter>
					<div className='w-full rounded-md flex bg-muted text-muted-foreground h-12'>
						<button
							className={`flex-1 flex justify-center items-center cursor-pointer  ${theme === 'dark' && 'bg-neutral-950 text-white'}   transition-opacity m-2 p-4 rounded-md`}
							onClick={() => {
								if (theme === 'light') return switchTheme()
								return
							}}
						>
							Dark
						</button>
						<button
							onClick={() => {
								if (theme === 'dark') return switchTheme()
								return
							}}
							className={`flex-1 flex justify-center items-center  cursor-pointer ${theme === 'light' && 'bg-neutral-950 text-white'}  transition-opacity m-2 p-4 rounded-md`}
						>
							Light
						</button>
					</div>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}
export default SideBarMenu
