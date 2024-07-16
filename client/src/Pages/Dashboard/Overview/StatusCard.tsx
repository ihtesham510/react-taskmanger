import { LucideIcon } from 'lucide-react'
interface Props {
	status: 'Completed' | 'Cancelled' | 'To Do' | 'Done' | 'Ongoing'
	Icon: LucideIcon
	value: number
	color: string
}
const StatusCard: React.FC<Props> = ({ status, color, Icon, value }) => {
	return (
		<div className='flex h-32 w-max flex-col justify-center rounded-md bg-primary-foreground'>
			<div className='m-4 grid flex-1 gap-3'>
				<div className='flex gap-8'>
					<div className={`h-16 w-2 ${color} rounded-full`} />
					<span className='flex'>
						<h1 className='text-6xl'>{value}</h1>
						<p className='text-lg'>%</p>
					</span>
				</div>
				<span className='flex items-center justify-between gap-6'>
					<p>{status}</p>
					<Icon className='size-4' />
				</span>
			</div>
		</div>
	)
}

export default StatusCard
