import { useToast } from '@/components/ui/use-toast'
import axios from 'axios'
import { PropsWithChildren, SetStateAction, createContext, useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'sonner'

interface User {
	_id: string
	first_name: string
	last_name?: string
	email: string
	password: string
}
interface UserContext {
	user: User | null
	loading: boolean
	setUser: React.Dispatch<SetStateAction<User | null>>
	signOut: () => void
}

export const UserContext = createContext<UserContext | undefined>(undefined)
export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null)
	const { toast } = useToast()
	const [loading, setLoading] = useState<boolean>(false)
	useEffect(() => {
		const getData = async () => {
			setLoading(true)
			try {
				const config = {
					withCredentials: true,
				}
				const data = await axios.get('http://localhost:3000/signin', config)
				if (data.data.message || data.data.error) {
					return setUser(null)
				}
				setUser(data.data)
			} catch (err) {
				alert(err)
			}
			setLoading(false)
		}
		getData()
	}, [])
	const signOut = async () => {
		try {
			const config = {
				withCredentials: true,
			}
			await axios.get('http://localhost:3000/signout', config)
			setUser(null)
		} catch (err) {
			toast({ variant: 'destructive', title: 'Server error', description: `${err}` })
		}
	}
	return <UserContext.Provider value={{ user, loading, setUser, signOut }}>{children}</UserContext.Provider>
}
export const useUser = () => {
	const user = useContext(UserContext)
	if (user === undefined) throw new Error('User Context must be provided')
	return user
}
