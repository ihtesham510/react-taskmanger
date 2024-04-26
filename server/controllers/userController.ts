import jsonwebtoken from 'jsonwebtoken'
import { Response, Request } from 'express'
import User, { findUser, getUsers, removeUser } from '../models/user.js'

export async function createUser(req: Request, res: Response) {
	const JWT_SECRET = process.env.JWT_SECRET
	if (!req.body.email || !req.body.password || !req.body.first_name || !req.body.last_name)
		return res.json('name ,email and password must always be given')

	if (!JWT_SECRET) throw new Error('JWT_SECRET must be provided')

	try {
		const userExists = await findUser(req.body.email)
		if (userExists) return res.status(409).json('user already exists')
	} catch (error) {
		return res.status(500).json({ message: 'Error while checking user', err: error })
	}
	try {
		const user = new User({
			email: req.body.email,
			password: req.body.password,
			first_name: req.body.first_name,
			last_name: req.body.last_name,
		})
		const token = jsonwebtoken.sign({ ...user }, JWT_SECRET, {
			algorithm: 'HS256',
		})
		await user.save()
		res.cookie('jwt', token, { httpOnly: true, expires: new Date(Date.now() + 11000) })
		return res.status(200).json({ token: token })
	} catch (error) {
		return res.status(500).json(error)
	}
}

export async function getAllUsers(req: Request, res: Response) {
	try {
		const { email, _id } = req.body
		const user = email ? await findUser(email, _id) : await getUsers()
		if (!user) return res.status(404).json({ Error: 'User not found' })
		return res.status(200).json(user)
	} catch (error: any) {
		if (error.errorResponse.code === 11000) {
			return res.status(409).json('Duplicate key error. Document already exists!')
		} else {
			return res.json(error)
		}
	}
}

export async function deleteUser(req: Request, res: Response) {
	try {
		const { _id } = req.params
		const deletedUser = await removeUser(_id)
		if (!deletedUser) return res.status(404).json({ Error: 'User not found' })
		return res.status(200).json({ message: 'User Deleted Successfully' })
	} catch (error) {
		res.status(505).json({ Error: 'Error while deleting all users' })
	}
}

export async function authorize(req: Request, res: Response) {
	const JWT_SECRET = process.env.JWT_SECRET
	if (!JWT_SECRET) throw new Error('JWT_SECRET must be provided')
	try {
		const cookie: string = req.cookies.jwt
		const docodedtoken: any = jsonwebtoken.verify(cookie, JWT_SECRET)
		res.json(docodedtoken._doc)
	} catch (error) {
		return res.status(505).json({ Error: 'Error while signing in' })
	}
}
