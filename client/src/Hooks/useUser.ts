import { UserContext } from '@/context/UserContext'
import { useContext } from 'react'

export default function useUser() {
	const userContext = useContext(UserContext)
	if (!userContext) throw new Error('User context must be provided')
	return userContext
}
