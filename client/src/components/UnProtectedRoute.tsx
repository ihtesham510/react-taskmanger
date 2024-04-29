import { useUser } from '@/context/UserContext'
import React, { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'

const UnProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
	const { user } = useUser()
	const userIsloggedin = user !== undefined && user !== null && user
	if (userIsloggedin) return <Navigate to='/dashboard' replace={true} />
	return children
}

export default UnProtectedRoute
