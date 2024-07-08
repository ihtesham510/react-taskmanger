import { useUserStore } from '@/store'
import { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import Loading from './Loading'

const UnProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
	const { user } = useUserStore()
	if (user === 'loading') return <Loading />
	return user ? <Navigate to='/dashboard' /> : children
}

export default UnProtectedRoute
