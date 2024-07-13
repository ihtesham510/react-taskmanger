import { Router } from 'express'
import auth, { deleteAllUsers, signOut, signin, signup } from '../controllers/user'
const route = Router()
route.post('/signup', signup)
route.delete('/users', deleteAllUsers)
route.post('/signin', signin)
route.get('/auth', auth)
route.get('/signout', signOut)
export default route
