import { TProject } from '@/lib/types'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import useUser from './useUser'

export default function useFetchProjects() {
	const { user } = useUser()
	const data = useQuery({
		queryKey: ['projects'],
		queryFn: () =>
			axios
				.get(`http://localhost:3000/project?userId=${user?.id}&withTasks=true`, { withCredentials: true })
				.then(res => res.data as TProject[]),
	})
	return data
}
