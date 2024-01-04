import NewTask from './Components/NewTask'
import Tasks from './Components/Tasks'
import { useDarkMode } from './Hooks/useDarkMode'
import useTasks from './Hooks/useTasks'

function App() {
	const { darkMode, toggleDarkMode } = useDarkMode()
	const { tasks, addTask, deleteTask, changeStatus } = useTasks()

	return (
		<>
			<div
				className={`lg:flex h-screen select-none items-center justify-center`}
			>
				<NewTask
					Mode={darkMode}
					toggleMode={toggleDarkMode}
					onAdd={addTask}
				/>
				<div className={`mx-2 h-full lg:w-1/2`}>
					<div
						className={`mt-2 grid place-items-center ${
							tasks.length === 0 ? 'lg:mt-80' : ''
						} gap-2`}
					>
						{tasks.length === 0 ? (
							<h1 className='dark:text-white text-xl'>
								no tasks currently available
							</h1>
						) : (
							tasks.map(task => (
								<Tasks
									key={task._id}
									task={task.task}
									day={task.time}
									progress={task.status}
									onClick={() => deleteTask(task._id)}
									onDoubleClick={() => changeStatus(task._id)}
								/>
							))
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default App
