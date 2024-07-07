import { Router } from 'express'
import auth, { deleteAllUsers, signin, signup } from '../controllers/user'
const route = Router()
route.post('/signup', signup)
route.delete('/users', deleteAllUsers)
route.post('/signin', signin)
route.get('/auth', auth)
export default route
