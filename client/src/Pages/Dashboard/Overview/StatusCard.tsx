import { LucideIcon } from 'lucide-react'
interface Props {
	status: 'Completed' | 'Cancelled' | 'To Do' | 'Done' | 'Ongoing'
	Icon: LucideIcon
	value: number
	color: string
}
const StatusCard: React.FC<Props> = ({ status, color, Icon, value }) => {
	return (
		<div className='w-max h-32 flex flex-col justify-center bg-primary-foreground rounded-md'>
			<div className='flex-1 grid gap-3 m-4'>
				<div className='flex gap-8'>
					<div className={`h-16 w-2 ${color} rounded-full`} />
					<span className='flex'>
						<h1 className='text-6xl'>{value}</h1>
						<p className='text-lg'>%</p>
					</span>
				</div>
				<span className='flex gap-6 items-center justify-between'>
					<p>{status}</p>
					<Icon className='size-4' />
				</span>
			</div>
		</div>
	)
}

export default StatusCard
