import { RiDeleteBin7Fill } from 'react-icons/ri'

const Tasks = ({ task, day, progress, onClick, onDoubleClick }) => {
	const status = progress ? 'border-l-green-700' : 'border-l-red-700'
	return (
		<div
			className={`flex h-24 w-9/12 items-center justify-between rounded-md border-l-4 ${status}  bg-gray-200 dark:bg-gray-900`}
			onDoubleClick={onDoubleClick}
		>
			<div>
				<h4
					className={`mx-5 select-none text-lg ${
						progress
							? 'text-gray-500 line-through dark:text-gray-500'
							: 'text-black dark:text-white'
					} font-bold `}
				>
					{task}
				</h4>
				<p className='text-md mx-5 select-none text-black dark:text-white'>
					{day}
				</p>
			</div>
			<RiDeleteBin7Fill
				className={`mx-9 cursor-pointer text-xl text-black hover:text-red-700 dark:text-white dark:hover:text-red-700`}
				onClick={onClick}
			/>
		</div>
	)
}

export default Tasks
