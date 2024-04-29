import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ThemeToggleButton from './components/ThemeToggle'
import LoginForm from './Pages/Login'
import { SignUpForm } from './Pages/Signup'
import UnProtectedRoute from './components/UnProtectedRoute'
import ProtectedRoute from './components/ProtectedRoute'
import { Button } from './components/ui/button'
import { useUser } from './context/UserContext'
function App() {
	const { user, signOut } = useUser()
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						path='/signin'
						element={
							<UnProtectedRoute>
								<LoginForm />
							</UnProtectedRoute>
						}
					/>
					<Route
						path='/signup'
						element={
							<UnProtectedRoute>
								<SignUpForm />
							</UnProtectedRoute>
						}
					/>
					<Route
						path='/'
						element={
							<>
								<ThemeToggleButton />
								<br />
							</>
						}
					/>
					<Route
						path='/dashboard'
						element={
							<ProtectedRoute>
								welcome {user && <p>{user.first_name}</p>}
								<br />
								<Button onClick={() => signOut()}>sign out</Button>
							</ProtectedRoute>
						}
					/>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
