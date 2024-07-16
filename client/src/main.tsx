import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ThemeContextProvider from './context/Theme.tsx'
import UserContextProvider from './context/UserContext.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'

const client = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={client}>
			<UserContextProvider>
				<ThemeContextProvider>
					<App />
				</ThemeContextProvider>
			</UserContextProvider>
		</QueryClientProvider>
	</React.StrictMode>,
)
