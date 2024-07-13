import React, { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import Loading from './Loading'
import useUser from '@/Hooks/useUser'

const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
	const { user, isLoading } = useUser()
	if (isLoading) return <Loading />
	return user && !isLoading ? children : <Navigate to='/login' />
}

export default ProtectedRoute
