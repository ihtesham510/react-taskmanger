import { useState, useEffect } from 'react'
import NewTask from './Components/NewTask'
import Tasks from './Components/Tasks'
import { useDarkMode } from './Hooks/useDarkMode'

function App() {
	const { darkMode, toggleDarkMode } = useDarkMode()

	const [tasks, setTasks] = useState([])

	useEffect(() => {
		const getTasks = async () => {
			const dataFromServer = await fetchTasks()
			setTasks(dataFromServer)
		}
		getTasks()
	}, [])

	const fetchTasks = async () => {
		const res = await fetch('http://localhost:7000/tasks')
		const data = await res.json()
		return data
	}

	const deleteTask = async _id => {
		await fetch(`http://localhost:7000/tasks/${_id}`, { method: 'DELETE' })
		setTasks(tasks.filter(task => task._id !== _id))
	}
	const changeStatus = async _id => {
		const taskToToggle = tasks.find(task => task._id === _id)

		const updatedTask = { ...taskToToggle, status: !taskToToggle.status }

		const response = await fetch(`http://localhost:7000/tasks/${_id}`, {
			method: 'PATCH',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(updatedTask),
		})
		const data = await response.json()
		console.log('Fetch response:', data)

		setTasks(prevTasks =>
			prevTasks.map(task =>
				task._id === _id ? { ...task, status: !task.status } : task,
			),
		)
	}
	const addTask = async task => {
		const newTask = { ...task }
		const res = await fetch('http://localhost:7000/tasks', {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify(newTask),
		})
		const data = await res.json()
		setTasks([...tasks, data])
	}
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
