import { User, useUserStore } from '@/store'
import axios from 'axios'
import { useEffect } from 'react'

export default function useUser() {
	const userStore = useUserStore()
	useEffect(() => {
		axios
			.get('http://localhost:3000/auth', { withCredentials: true })
			.then(res => userStore.setUser(res.data as User))
			.catch(err => console.log(err))
	}, [])
	return userStore
}
