import { useUserStore } from '@/store'
import React, { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
	const { user } = useUserStore()
	return user === undefined ? <Navigate to='/register' /> : children
}

export default ProtectedRoute
