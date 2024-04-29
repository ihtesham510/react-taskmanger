import { Router } from 'express'
import {
	authorize,
	createUser,
	deleteAllUsers,
	deleteUser,
	getAllUsers,
	loginUser,
  signOut
} from '../controllers/userController.js'

const route = Router()
route.post('/signup', createUser)
route.get('/user', getAllUsers)
route.delete('/user/:id', deleteUser)
route.delete('/users', deleteAllUsers)
route.get('/signin', authorize)
route.post('/signin', loginUser)
route.get('/signout',signOut)
export default route
