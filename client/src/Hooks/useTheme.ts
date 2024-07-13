import { ThemeContext } from '@/context/Theme'
import { useContext } from 'react'

export const useTheme = () => {
	const themeContext = useContext(ThemeContext)
	if (!themeContext) throw new Error('Theme context must be provided')
	return themeContext
}
