import jsonwebtoken from 'jsonwebtoken'
import { Response, Request } from 'express'
import User, { findUser, getUsers, removeUser } from '../models/user.js'

const expiry = 1 * 24 * 60 * 60 * 1000

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
		res.cookie('jwt', token, { httpOnly: true, expires: new Date(Date.now() + expiry) })
		return res.status(200).json({ ...user, token: token })
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
		const { id } = req.params
		const deletedUser = await removeUser(id)
		if (!deletedUser) return res.status(404).json({ Error: 'User not found' })
		return res.status(200).json({ message: 'User Deleted Successfully' })
	} catch (error) {
		res.status(505).json({ Error: 'Error while deleting all users' })
	}
}
export async function deleteAllUsers(req: Request, res: Response) {
	try {
		const users = await User.find({})
		if (users.length === 0) {
			return res.status(409).json('There are no users')
		}
		const deletedUsers = users.map((u) => u._id)
		users.forEach(async (u) => {
			await User.findByIdAndDelete(u._id)
			deletedUsers.push(u._id)
		})
		return res.status(200).json(deletedUsers)
	} catch (error) {
		res.json('error while deleing users')
	}
}

export async function authorize(req: Request, res: Response) {
	const JWT_SECRET = process.env.JWT_SECRET
	if (!JWT_SECRET) throw new Error('JWT_SECRET must be provided')
	try {
		const cookie: string = req.cookies.jwt
		if (!cookie) return res.json({ error: 'Cookie not found' })
		const verifiedToken: any = jsonwebtoken.verify(cookie, JWT_SECRET)
		const decodedtoken: any = jsonwebtoken.decode(cookie)
		const userExists = await User.findOne({
			email: verifiedToken._doc.email,
			password: verifiedToken._doc.password,
		})
		if (!userExists) {
			res.cookie('jwt', null, { expires: new Date(Date.now()) })
			return res.json({ message: 'user does not exists or the user has been deleted' })
		}
		res.json(decodedtoken._doc)
		console.log(typeof verifiedToken)
		console.log(decodedtoken, typeof decodedtoken)
	} catch (error) {
		return res.status(505).json({ Error: 'Error while signing in' })
	}
}

export async function loginUser(req: Request, res: Response) {
	const JWT_SECRET = process.env.JWT_SECRET
	if (!JWT_SECRET) throw new Error('JWT_SECRET must be provided')
	try {
		const user = await User.findOne({ email: req.body.email })
		if (!user) return res.status(404).json({ Error: 'user not found' })
		if (user.password === req.body.password) {
			const token = jsonwebtoken.sign({ ...user }, JWT_SECRET)
			if (!token) throw new Error('Error while signing token')
			res.cookie('jwt', token, { httpOnly: true, expires: new Date(Date.now() + expiry) })
			return res.status(200).json({ ...user, token: token })
		}
		return res.status(409).json({ Error: 'password is not correct' })
	} catch (error) {
		return res.status(500).json({ Error: 'Error wile loggin in user' })
	}
}

export const signOut = (req: Request, res: Response) => {
	res.cookie('jwt', null, { expires: new Date(Date.now()) })
	res.json('hi')
}
