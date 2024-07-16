import { CheckCircle, Circle, CircleDashed, CircleX } from 'lucide-react'
import StatusCard from './StatusCard'
import BarCharter from './BarChart'
import Projects from './Projects'

const Overview = () => {
	return (
		<>
			<div className='flex flex-col lg:flex-row'>
				<div className='flex w-[100%] flex-col justify-center gap-4 lg:w-[50%]'>
					<div className='mx-auto mt-9 flex flex-wrap justify-center gap-4'>
						<StatusCard status='Completed' Icon={CheckCircle} value={30} color='bg-green-500' />
						<StatusCard status='Ongoing' Icon={CircleDashed} value={30} color='bg-blue-600' />
						<StatusCard status='To Do' Icon={Circle} value={30} color='bg-accent' />
						<StatusCard status='Cancelled' Icon={CircleX} value={30} color='bg-red-600' />
					</div>
					<BarCharter />
				</div>
				<Projects />
			</div>
		</>
	)
}

export default Overview
