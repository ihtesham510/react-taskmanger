import { CheckCircle, Circle, CircleDashed, CircleX } from 'lucide-react'
import StatusCard from './StatusCard'

const Overview = () => {
	return (
		<>
			<div className='flex'>
				<div className='flex flex-col'>
					<div className=' md:mx-auto flex flex-wrap gap-8 mt-9 ml-9'>
						<StatusCard status='Completed' Icon={CheckCircle} value={30} color='bg-green-500' />
						<StatusCard status='To Do' Icon={Circle} value={30} color='bg-accent' />
						<StatusCard status='Cancelled' Icon={CircleX} value={30} color='bg-red-600' />
						<StatusCard status='Ongoing' Icon={CircleDashed} value={30} color='bg-blue-600' />
					</div>
				</div>
			</div>
		</>
	)
}

export default Overview
