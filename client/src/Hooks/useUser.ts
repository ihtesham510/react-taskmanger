import { User } from '@/lib/types'
import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

export default function useUser() {
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	// Auth
	const { data, isLoading, isError } = useQuery<User | null>({
		queryKey: ['user'],
		queryFn: async (): Promise<User | null> => {
			try {
				const res = await axios.get('http://localhost:3000/auth', { withCredentials: true })
				return res.data as User
			} catch (err) {
				if (axios.isAxiosError(err) && err.response) {
					const statuscode = err.response.status
					if (statuscode === 405) {
						queryClient.setQueryData(['user'], null)
						return null  
					}
					if (statuscode === 500) {
						navigate('/error')
						return null 
					}
				}
				return null 
			}
		},
		retry: false,
	})
	// signout
	const signOutMutation = useMutation({
		mutationFn: async () => {
			const res = await axios.get('http://localhost:3000/signout', { withCredentials: true })
			return res.data
		},
		onSuccess: () => queryClient.invalidateQueries(['user']),
	})
	//sign in
	const signInMutation = useMutation({
		mutationFn: async (data: User) =>
			axios.post('http://localhost:3000/signin', data, { withCredentials: true }).then(res => res.data),
		onSuccess: () => queryClient.invalidateQueries(['user']),
	})
	const user = data
	const signOut = signOutMutation.mutate
	const signIn = signInMutation.mutate

	return { user, isLoading, isError, signOut, signIn }
}
