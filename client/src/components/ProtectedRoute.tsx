import React, { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { useUser } from '@/context/UserContext'
const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
	const { user, loading } = useUser()
	if (user !== undefined && user !== null && user) return children
	return loading ? null : <Navigate to='/signin' replace={true} />
}

export default ProtectedRoute
