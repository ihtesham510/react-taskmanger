import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'
import ProfileButton from '@/components/ProfileButton'
import ThemeButton from '@/components/ThemeButton'
import { AlignLeft, BookCheckIcon } from 'lucide-react'
import SideBarMenu from './SideBarMenu'
import { Button } from '@/components/ui/button'
const Dashboard = () => {
	return (
		<div className='md:flex'>
			<SideBar />
			<div className='block md:ml-[58px] md:flex-1'>
				<header className='sticky top-0 flex h-[60px] items-center justify-between backdrop-blur'>
					<div className='ml-4 flex items-center gap-3'>
						<div className='hidden items-center gap-3 md:flex'>
							<BookCheckIcon className='mt-1' />
							<h1 className='text-2xl'>React Taskmanger</h1>
						</div>
						<div className='md:hidden'>
							<SideBarMenu>
								<Button variant='ghost' size='icon'>
									<AlignLeft className='size-6' />
								</Button>
							</SideBarMenu>
						</div>
					</div>
					<div className='mr-4 flex items-center gap-3'>
						<ProfileButton />
						<ThemeButton className='hidden md:block' />
					</div>
				</header>
				<Outlet />
			</div>
		</div>
	)
}

export default Dashboard
