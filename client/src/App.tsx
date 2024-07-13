import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Error404 from './Pages/404'
import Dashboard from './Pages/Dashboard'
import UnProtectedRoute from './components/UnProtectedRoute'
import ProtectedRoute from './components/ProtectedRoute'
import Register from './Pages/Register'
import Login from './Pages/Login'
import { useTheme } from './Hooks/useTheme'

const App = () => {
	const { theme } = useTheme()
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						path='/'
						element={
							<UnProtectedRoute>
								<Home />
							</UnProtectedRoute>
						}
					/>
					<Route path='*' element={<Error404 />} />
					<Route
						path='/dashboard'
						element={
							<ProtectedRoute>
								<Dashboard />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/register'
						element={
							<UnProtectedRoute>
								<Register />
							</UnProtectedRoute>
						}
					/>
					<Route
						path='/login'
						element={
							<UnProtectedRoute>
								<Login />
							</UnProtectedRoute>
						}
					/>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
