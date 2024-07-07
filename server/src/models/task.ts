import mongoose from 'mongoose'

interface TaskType {
  title: string
  description: string
  completed: boolean
  createdAt: string
  updatedAt?: string
}
const taskSchema = new mongoose.Schema<TaskType>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, required: true },
  createdAt: { type: String, required: true },
  updatedAt: String,
})

export const Task = mongoose.model<TaskType>('task', taskSchema)

export const createTask = async (newTask: TaskType) => {
  const task = new Task(newTask)
  await task.save()
  return task
}
