import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ThemeToggleButton from './components/ThemeToggle'
import LoginForm from './Pages/Login'
import { SignUpForm } from './Pages/Signup'

function App() {
	return (
		<>
			{/* <div className='h-screen w-screen flex justify-center items-center'> */}
			{/* 	<ThemeToggleButton /> */}
			{/* 	<SignUpForm /> */}
			{/* </div> */}
			<BrowserRouter>
				<Routes>
					<Route path='/signin' element={<LoginForm />} />
					<Route path='/signup' element={<SignUpForm />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
