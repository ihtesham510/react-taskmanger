import mongoose from 'mongoose'

export interface UserType {
  email: String
  password: String
  first_name: String
  last_name?: String
}

const schema = new mongoose.Schema<UserType>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: false },
})

export const User = mongoose.model<UserType>('user', schema)

export const createUser = async (user: UserType) => {
  const newUser = new User(user)
  await newUser.save()
  return newUser
}
