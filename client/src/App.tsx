import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Error404 from './Pages/404'
import UnProtectedRoute from './components/UnProtectedRoute'
import ProtectedRoute from './components/ProtectedRoute'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard/Index'
import AllTasks from './Pages/Dashboard/AllTasks'
import Overview from './Pages/Dashboard/Overview'
import Projects from './Pages/Dashboard/Projects'
import Analytics from './Pages/Dashboard/Analytics'

const App = () => {
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
					>
						<Route path='overview' element={<Overview />} />
						<Route path='alltasks' element={<AllTasks />} />
						<Route path='projects' element={<Projects />} />
						<Route path='analytics' element={<Analytics />} />
					</Route>
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
