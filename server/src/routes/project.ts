import { Router } from 'express'
import { validateProjectRequest } from '../middleware/project'
import {
  addManyProjects,
  createProject,
  deleteProjectbyId,
  deleteProjects,
  getProject,
  getProjectbyID,
} from '../controllers/project'

const route = Router()
route.post('/project/new', validateProjectRequest, createProject)
route.post('/project/new/raw', addManyProjects)
route.get('/project', getProject)
route.get('/project/:id', getProjectbyID)
route.delete('/project/:id', deleteProjectbyId)
route.delete('/project', deleteProjects)
export default route
