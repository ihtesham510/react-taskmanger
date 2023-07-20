import { useState, useEffect } from 'react'
import NewTask from './Components/NewTask'
import Tasks from './Components/Tasks'

function App() {
	const [darkMode, setDarkMode] = useState(getInitialMode())

	useEffect(() => {
		document.documentElement.classList.toggle('dark', darkMode)
		localStorage.setItem('darkMode', JSON.stringify(darkMode))
	}, [darkMode])

	function getInitialMode() {
		const savedMode = JSON.parse(localStorage.getItem('darkMode'))
		return savedMode || false // Set to true if you want dark mode as the default.
	}

	function toggleDarkMode() {
		setDarkMode((prevMode) => !prevMode)
	}

	const [tasks, setTasks] = useState([])

	useEffect(() => {
		const getTasks = async () => {
			const dataFromServer = await fetchTasks()
			setTasks(dataFromServer)
		}
		getTasks()
	}, [])

	const fetchTasks = async () => {
		const res = await fetch('http://localhost:5000/tasks')
		const data = await res.json()
		return data
	}

	const deleteTask = async (id) => {
		await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' })
		setTasks(tasks.filter((task) => task.id !== id))
	}

	const changeStatus = async (id) => {
		const taskToToggle = tasks.find((task) => task.id === id)
		const updtask = { ...taskToToggle, status: !taskToToggle.status }
		await fetch(`http://localhost:5000/tasks/${id}`, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(updtask),
		})
		setTasks(
			tasks.map((task) =>
				task.id === id ? { ...task, status: !task.status } : task,
			),
		)
	}
	function generateId() {
		return Math.floor(Math.random() * 1000 + 1)
	}

	const addTask = async (task) => {
		const newTask = { ...task, id: generateId() }
		const res = await fetch('http://localhost:5000/tasks', {
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
				<div className={`mx-2 h-full lg:w-1/2 rounded-lg`}>
					<div className='mt-2 grid place-items-center gap-2'>
						{tasks.length === 0 ? (
							<h1 className='dark:text-white'>
								no tasks currently available
							</h1>
						) : (
							tasks.map((task) => (
								<Tasks
									key={task.id}
									task={task.task}
									day={task.time}
									progress={task.status}
									onClick={() => deleteTask(task.id)}
									onDoubleClick={() => changeStatus(task.id)}
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
