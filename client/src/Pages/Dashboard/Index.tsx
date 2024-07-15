import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'
import ProfileButton from '@/components/ProfileButton'
import ThemeButton from '@/components/ThemeButton'
import { AlignLeft, BookCheckIcon } from 'lucide-react'
import SideBarMenu from './SideBarMenu'
import { Button } from '@/components/ui/button'
const Dashboard = () => {
	return (
		<div className='md:flex '>
			<SideBar />
			<div className='md:flex-1 block md:ml-[58px] '>
				<header className='sticky h-[60px] top-0 flex items-center justify-between backdrop-blur'>
					<div className='flex items-center gap-3 ml-4'>
						<div className='md:flex items-center gap-3 hidden'>
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
					<div className='flex items-center gap-3 mr-4'>
						<ProfileButton />
						<ThemeButton className='md:block hidden' />
					</div>
				</header>
				<Outlet />
			</div>
		</div>
	)
}

export default Dashboard
