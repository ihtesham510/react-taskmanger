import { Response, Request } from 'express'
import { Task, createTask } from '../models/task'

export const createNewTask = async (req: Request, res: Response) => {
  const { title, description, completed } = req.body
  if (!title || !description || completed === undefined) {
    return res.status(500).json('missing request body')
  }
  try {
    const newTask = await createTask({
      title: title,
      description: description,
      completed: completed,
      createdAt: `${Date.now().toString()}`,
    })
    return res.status(200).json(newTask)
  } catch (err) {
    return res.status(500).json('Error while creating a new task')
  }
}

export const deleteAllTask = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.deleteMany({})
    return res.status(200).json(tasks)
  } catch (err) {
    return res.status(500).json('Error while deleting all tasks')
  }
}

export const deleteTaskbyID = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const tasks = await Task.findByIdAndDelete({ _id: id })
    return res.status(200).json(tasks)
  } catch (err) {
    return res.status(500).json('Error while deleting all tasks')
  }
}

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({})
    return res.status(200).json(tasks)
  } catch (err) {
    res.status(200).json('Error while getting task')
  }
}

export const getTaskbyId = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const task = await Task.findOne({ _id: id })
    return res.status(200).json(task)
  } catch (err) {
    res.status(200).json('Error while getting task')
  }
}

export const updateTaskbyId = async (req: Request, res: Response) => {
  const { id } = req.params
  const { title, description, completed } = req.body
  if (!title || !description || completed === undefined) {
    return res.status(500).json('Missing request body')
  }
  try {
    const newTask = await Task.findByIdAndUpdate(id, {
      title: title,
      description: description,
      completed: completed,
      updatedAt: `${Date.now().toString()}`,
    })
    return res.status(200).json(newTask)
  } catch (err) {
    return res.status(500).json('Missing request body')
  }
}
