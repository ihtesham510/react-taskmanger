import { createContext, PropsWithChildren, useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios'
export interface User {
	id: string
	email: string
	password: string
	first_name: string
	last_name?: string
}
export interface UserContextType {
	user: User | undefined
	setUser: (user: User) => void
	isLoading: boolean
	signOut: () => void
}
export const UserContext = createContext<UserContextType | undefined>(undefined)
const UserContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [user, setuser] = useState<User | undefined>()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	useEffect(() => {
		;(async () => {
			setIsLoading(true)
			try {
				const res = await axios.get('http://localhost:3000/auth', { withCredentials: true })
				console.log(res.data)
				return setuser(res.data as User)
			} catch (err) {
				if (err instanceof AxiosError) {
					if (err.status === 405) return setuser(undefined)
					console.log(err)
				}
				return setuser(undefined)
			} finally {
				setIsLoading(false)
			}
		})()
	}, [])
	const signOut = async () => {
		await axios
			.get('http://localhost:3000/signout', { withCredentials: true })
			.then(res => setuser(undefined))
			.catch(err => console.log(err))
	}
	const setUser = (user: User) => setuser(user)

	return <UserContext.Provider value={{ user, setUser, isLoading, signOut }}>{children} </UserContext.Provider>
}
export default UserContextProvider
