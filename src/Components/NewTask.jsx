import React from 'react'
import { useState } from 'react'

import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'
const NewTask = ({ toggleMode, Mode, addtask }) => {
  const [task, setTask] = useState('')
  const [day, setDay] = useState('')
  const [status, setStatus] = useState(false)
  const submit = (e) => {
    e.preventDefault()
    if (!task) {
      alert(
        ' please add a task'
      )
    }
    if (!day) {
      alert('please add a day')
    }
    addtask({ task, day, status })

    setTask(' ')
    setDay(' ')
    setStatus(false)

  }
  return (
    <div className="h-full w-1/2">
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
          <label className="pl-1 text-xl dark:text-white text-black">Task</label>
          <br />
          <input
            type="text"
            className="w-full border-2 dark:border-transparent border-transparent h-12 bg-gray-200 dark:bg-gray-900 my-2 text-black dark:text-white rounded-sm  active:dark:border-slate-700 p-3 placeholder-slate-400  contrast-more:placeholder-slate-500"
            placeholder="Enter you task"
            onChange={(e) => { setTask(e.target.value) }}
          />
        </div>
        <div className="w-9/12 my-4 ">
          <label className="pl-1 text-xl dark:text-white text-black">Task</label>
          <br />
          <input
            type="text"
            className="w-full border-2 dark:border-transparent border-transparent h-12 bg-gray-200 dark:bg-gray-900 my-2 text-black dark:text-white rounded-sm  active:dark:border-slate-700 p-3 placeholder-slate-400  contrast-more:placeholder-slate-500"
            placeholder="Enter you task"
            onChange={(e) => { setDay(e.target.value) }}
          />
        </div>
        <div className='w-9/12 my-4 flex justify-between '>
          <label htmlFor="checkbox" className='text-white mx-2'>Task is done ?</label>
          <input
            type="checkbox"
            onChange={(e) => { setStatus(e.currentTarget.checked) }}
            name='checkbox' className='mx-2' />
          checked={status}
        </div>
        <button className="select-none rounded-lg bg-black px-40 py-4 font-bold text-white dark:bg-white dark:text-black" >
          Save Task
        </button>
      </form>
    </div>
  )
}

export default NewTask
