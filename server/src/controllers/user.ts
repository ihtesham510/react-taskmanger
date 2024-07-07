import { Request, Response } from 'express'
import { User, createUser } from '../models/user'
import jsonwebtoken from 'jsonwebtoken'

const JWT_EXPIRY = Number(process.env.JWT_EXPIRY) || 1
const expiry = JWT_EXPIRY * 24 * 60 * 60 * 1000

export const signup = async (req: Request, res: Response) => {
  const { email, password, first_name, last_name } = req.body
  if (!email || !password || !first_name) return res.status(500).json({ Error: 'Missing body' })
  const JWT_SECRET = process.env.JWT_SECRET
  if (!JWT_SECRET) throw new Error('JWT secret must be provided')

  try {
    const userExists = await User.findOne({ email: email })
    if (userExists) return res.status(409).json({ Error: 'user already exists' })
    const newUser = await createUser({ email: email, password: password, first_name: first_name, last_name: last_name })
    const jwt_token = jsonwebtoken.sign({ ...newUser }, JWT_SECRET, {
      algorithm: 'HS256',
    })
    res.cookie('jwt', jwt_token, { httpOnly: true, expires: new Date(Date.now() + expiry) })
    return res.status(200).json(newUser)
  } catch (error) {
    return res.status(500).json({ Error: 'Error while creating user' })
  }
}

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body
  if (!email || !password) return res.json({ Error: 'Missing body' })
  const JWT_SECRET = process.env.JWT_SECRET
  if (!JWT_SECRET) throw new Error('JWT secret must be provided')

  try {
    const user = await User.findOne({ email: email })
    if (!user) return res.status(404).json({ message: 'user not found' })

    if (user.password === password) {
      const jwt_token = jsonwebtoken.sign({ ...user }, JWT_SECRET, {
        algorithm: 'HS256',
      })
      res.cookie('jwt', jwt_token, { httpOnly: true, expires: new Date(Date.now() + expiry) })
      return res.status(200).json(user)
    }
    return res.status(409).json({ Error: 'Password is incorrect', User: user, Password: password })
  } catch (error) {
    return res.status(500).json({ Error: 'Error while signing in' })
  }
}

export const deleteAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({})
    users.map(async u => await User.findByIdAndDelete(u._id))
    return res.status(200).json(users)
  } catch (error) {
    return res.status(500).json('Error while delete all users')
  }
}
export default async function auth(req: Request, res: Response) {
  const JWT_SECRET = process.env.JWT_SECRET
  if (!JWT_SECRET) throw new Error('JWT secret must be provided')
  const jwt = req.cookies.jwt
  if (!jwt) return res.status(404).json({ Error: 'no cookie' })
  try {
    const data: any = jsonwebtoken.verify(jwt, JWT_SECRET)
    const { email, password } = data._doc
    const userExists = await User.findOne({ email: email })
    if (userExists) return res.status(200).json(userExists)
    return res.status(404).json({ Error: 'User does not exists anymore' })
  } catch (err) {
    return res.status(500).json({ Error: 'Error while checking user' })
  }
}
