import { Router } from 'express'
import {
  createNewTask,
  deleteAllTask,
  deleteTaskbyID,
  getTaskbyId,
  getTasks,
  updateTaskbyId,
} from '../controllers/task'

const route = Router()

route.get('/task', getTasks)
route.get('/task/:id', getTaskbyId)

route.patch('/task/:id', updateTaskbyId)

route.delete('/task', deleteAllTask)
route.delete('/task/:id', deleteTaskbyID)

route.post('/task', createNewTask)

export default route
