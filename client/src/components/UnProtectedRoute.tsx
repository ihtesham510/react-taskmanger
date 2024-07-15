import { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import Loading from './Loading'
import useUser from '@/Hooks/useUser'

const UnProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
	const { user, isLoading } = useUser()
	if (isLoading) return <Loading />
	return user && !isLoading ? <Navigate to='/dashboard/overview' /> : children
}

export default UnProtectedRoute
