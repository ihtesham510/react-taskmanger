import { useEffect, useState } from 'react'
const useTasks = () => {
	/*
	 * first update the state in component
	 * then send the request to the server
	 */

	const [tasks, setTasks] = useState([])

	useEffect(() => {
		const getTasks = async () => {
			const dataFromServer = await fetchTasks()
			setTasks(dataFromServer)
		}
		getTasks()
	}, []) // when the page loades this will fetch the tasks and update the state

	const fetchTasks = async () => {
		const res = await fetch('http://localhost:7000/tasks')
		const data = await res.json()
		return data
	}

	const deleteTask = async _id => {
		setTasks(tasks.filter(task => task._id !== _id)) // update the state
		await fetch(`http://localhost:7000/tasks/${_id}`, { method: 'DELETE' }) // update the server
	}
	// update tasks
	const changeStatus = async _id => {
		/* prettier-ignore */
		setTasks(prevTasks => prevTasks.map(task => task._id === _id ? { ...task, status: !task.status } : task )) // update the state

		/* Patch the tasks in the server */
		const taskToToggle = tasks.find(task => task._id === _id) // find id of updating tasks
		const updatedTask = { ...taskToToggle, status: !taskToToggle.status } // object of updated task
		const response = await fetch(`http://localhost:7000/tasks/${_id}`, {
			method: 'PATCH',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(updatedTask),
		})
	}

	const addTask = async task => {
		/* update the server */
		const newTask = { ...task }
		const res = await fetch('http://localhost:7000/tasks', {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify(newTask),
		})
		const data = await res.json()
		setTasks([...tasks, data]) // update the state
	}
	return { tasks, addTask, changeStatus, deleteTask }
}
export default useTasks
