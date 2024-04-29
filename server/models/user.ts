import mongoose from 'mongoose'
const schema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	first_name: { type: String, required: true },
	last_name: { type: String, required: false },
})

const User = mongoose.model('user', schema)

export const addUser = (email: string, password: string) => new User({ email: email, password: password })

export const removeUser = (_id: string) => User.findByIdAndDelete(_id)

export const findbyEmailandUpdatePassword = (email: string, password: string) =>
	User.findOneAndUpdate({ email: email }, { password: password })

export const findUser = (email?: string, _id?: string) =>
	_id ? User.findOne({ _id: _id }) : User.findOne({ email: email })

export const getUsers = () => User.find({})

export default User
