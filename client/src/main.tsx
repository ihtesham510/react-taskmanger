import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { Toaster } from './components/ui/toaster.tsx'
import { UserProvider } from './context/UserContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<UserProvider>
			<ThemeProvider>
				<App />
				<Toaster />
			</ThemeProvider>
		</UserProvider>
	</React.StrictMode>,
)
