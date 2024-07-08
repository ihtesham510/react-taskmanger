import { useUserStore } from '@/store'
import { useEffect } from 'react'

export default function useUser() {
	const userStore = useUserStore()
	useEffect(() => {
		userStore.getAuth()
	}, [])
	return userStore
}
