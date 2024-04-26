import { Router } from 'express'
import { authorize, createUser, deleteUser, getAllUsers } from '../controllers/userController.js'

const route = Router()
route.post('/signup', createUser)
route.get('/user', getAllUsers)
route.delete('/user/:id', deleteUser)
route.get('/auth', authorize)
export default route
