import { useUserStore } from '@/store'
import { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'

const UnProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
	const { user } = useUserStore()
	return !user === undefined ? <Navigate to='/dashboard' /> : children
}

export default UnProtectedRoute
