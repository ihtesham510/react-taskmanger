import { useState, useEffect } from 'react'
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'
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
  const [tasks, setTasks] = useState([
    {
      id: 1,
      task: 'go shopping with kids',
      time: 'may 22 2:49pm',
      status: false,
    },
    {
      id: 2,
      task: 'clean the house in detail ',
      time: 'may 29 9:40pm',
      status: false,
    },
    {
      id: 3,
      task: 'go to a bussiness trip with wify',
      time: 'may 30 2:00pm',
      status: false,
    },
    {
      id: 4,
      task: 'go to the beack to enjoy holiday',
      time: 'june 22 12:00pm',
      status: true,
    },
  ])
  const deleteTask = (id) => {
  setTasks(tasks.filter((task) => task.id !== id))
  }
  const changeStatus = (id) =>
    setTasks(
      tasks.map((task) =>
        task.id == id ? { ...task, status: !task.status } : task,
      ),
    )
  const addTask = (task) => setTasks([...tasks, task])
  return (
    <>
      <div                             className="flex h-screen select-none items-center justify-center dark:bg-black  ">
        <NewTask
          Mode={darkMode}
     toggleMode={toggleDarkMode}
          onAdd={addTask}
        />
        <div className={` mx-2  h-full w-1/2 rounded-lg`}>
          <div className="mt-2 grid place-items-center gap-2">
            {tasks.map((task) => (
              <Tasks
                task={task.task}
                day={task.time}
            progress={task.status}
                onClick={() => deleteTask(task.id)}
                onDoubleClick={() => changeStatus(task.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
