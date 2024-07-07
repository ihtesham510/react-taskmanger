import { useThemeStore } from '@/store'
import { useEffect } from 'react'

export default function useTheme() {
	const themestore = useThemeStore()
	useEffect(() => {
		;(() =>
			themestore.theme === 'dark'
				? document.documentElement.classList.add('dark')
				: document.documentElement.classList.remove('dark'))()
		localStorage.setItem('theme', themestore.theme)
	}, [themestore.theme])
	return themestore
}
