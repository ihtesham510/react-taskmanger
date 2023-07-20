import React from 'react'
import { useState } from 'react'

import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'
const NewTask = ({ toggleMode, Mode, onAdd }) => {
	const [id] = useState(Math.floor(Math.random() * 10000 + 1))
	const [task, setTask] = useState('')
	const [time, setTime] = useState('')
	const [status, setStatus] = useState(false)
	const [errorTime, setErrorTime] = useState('')
	const [errorTask, setErrorTask] = useState('')
	const setError = () => {
		setErrorTime('Please enter some Time')
		setErrorTask('Please enter some Task')
	}
	const submit = (e) => {
		e.preventDefault()
		!task | !time ? setError() : onAdd({ id, task, time, status })
		setTask('')
		setTime('')
		setStatus(false)
	}

	return (
		<div className="lg:w-1/2">
			<div className="flex h-24 items-center justify-around dark:bg-black ">
				<h1 className="text-3xl dark:text-white">Task manager</h1>
				<div className="flex items-center gap-1">
					<button
						className="justify-center rounded-lg bg-black p-3  text-3xl text-white dark:bg-white dark:text-black"
						onClick={toggleMode}
					>
						{Mode ? <BsFillMoonFill /> : <BsFillSunFill />}
					</button>
				</div>
			</div>
			<form className="grid h-auto place-items-center " onSubmit={submit}>
				<div className="w-9/12 my-4 ">
					<label className="pl-1 text-xl dark:text-white text-black">
						Task
					</label>
					<br />
					<input
						type="text"
						value={task}
						className="w-full border-2 dark:border-transparent border-transparent h-12 bg-gray-200 dark:bg-gray-900 my-2 text-black dark:text-white rounded-sm  active:dark:border-slate-700 p-3 placeholder-slate-400  contrast-more:placeholder-slate-500"
						placeholder="Enter you task"
						onChange={(e) => {
							setTask(e.target.value)
							setErrorTask('')
						}}
					/>
					<p className="p-1 text-red-600">{errorTask}</p>
				</div>
				<div className="w-9/12 my-4 ">
					<label className="pl-1 text-xl dark:text-white text-black">
						Day and time
					</label>
					<br />
					<input
						type="text"
						value={time}
						className="w-full border-2 dark:border-transparent border-transparent h-12 bg-gray-200 dark:bg-gray-900 my-2 text-black dark:text-white rounded-sm  active:dark:border-slate-700 p-3 placeholder-slate-400  contrast-more:placeholder-slate-500"
						placeholder="Enter Day & time"
						onChange={(e) => {
							setTime(e.target.value)
							setErrorTime('')
						}}
					/>
					<p className="p-1 text-red-600">{errorTime}</p>
				</div>
				<div className="w-9/12 my-4 flex justify-between">
					<label
						htmlFor="checkbox"
						className="dark:text-white mx-2 text-xl"
					>
						Task is done ?
					</label>

					<input
						type="checkbox"
						name="checkbox"
						className="mx-2"
						checked={status}
						onChange={(e) => setStatus(e.currentTarget.checked)}
					/>
				</div>

				<div className="w-9/12 my-4 ">
					<input
						type="submit"
						className="select-none rounded-lg bg-black mt-10 w-full sm:mb-12 py-4 font-bold text-white dark:bg-white dark:text-black"
					/>
				</div>
			</form>
		</div>
	)
}

export default NewTask
