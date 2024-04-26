import { useCallback, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

export default function useTheme() {
	const getInitialTheme = (): Theme => {
		const hasDarkTheme = localStorage.getItem('theme')
		if (!hasDarkTheme) {
			return 'dark'
		}
		if (hasDarkTheme == 'dark') return 'dark'
		return 'light'
	}
	const [theme, setTheme] = useState<Theme>(getInitialTheme)
	useEffect(() => {
		if (theme == 'dark') {
			localStorage.setItem('theme', 'dark')
			document.documentElement.classList.add('dark')
		} else {
			localStorage.setItem('theme', 'light')
			document.documentElement.classList.remove('dark')
		}
	}, [theme])
	const toggleTheme = useCallback(() => {
		setTheme((theme) => (theme == 'dark' ? 'light' : 'dark'))
	}, [theme])
	return { theme, toggleTheme }
}
