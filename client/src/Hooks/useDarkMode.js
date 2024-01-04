import { useCallback, useEffect, useState } from 'react'

export const useDarkMode = () => {
	const [darkMode, setDarkMode] = useState(getInitialMode())

	useEffect(() => {
		document.documentElement.classList.toggle('dark', darkMode)
		localStorage.setItem('darkMode', JSON.stringify(darkMode))
	}, [darkMode])

	function getInitialMode() {
		const savedMode = JSON.parse(localStorage.getItem('darkMode'))
		return savedMode || false // Set to true if you want dark mode as the default.
	}

	const toggleDarkMode = useCallback(() => {
		setDarkMode(prevMode => !prevMode)
	}, [darkMode])
	return { darkMode, toggleDarkMode }
}
