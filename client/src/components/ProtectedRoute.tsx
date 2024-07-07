import { useUserStore } from '@/store'
import React, { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import Loading from './Loading'

const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
	const { user } = useUserStore()
	return user ? children : <Navigate to='/register' />
}

export default ProtectedRoute
