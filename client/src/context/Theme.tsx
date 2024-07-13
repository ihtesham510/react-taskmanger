import React, { PropsWithChildren, createContext, useCallback, useEffect, useState } from 'react'
export type Theme = 'dark' | 'light'
export interface ThemeContextType {
	theme: Theme
	switchTheme: () => void
}
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)
const ThemeContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [theme, setTheme] = useState<Theme>(() => {
		const initialTheme =
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		if (initialTheme) return 'dark'
		return 'light'
	})
	useEffect(() => {
		theme === 'dark'
			? document.documentElement.classList.add('dark')
			: document.documentElement.classList.remove('dark')
		localStorage.setItem('theme', theme)
		console.log(theme)
	}, [theme])
	const switchTheme = useCallback(() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark')), [theme])
	return <ThemeContext.Provider value={{ theme, switchTheme }}>{children}</ThemeContext.Provider>
}

export default ThemeContextProvider
