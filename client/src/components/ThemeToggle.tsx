import useTheme from '@/Hooks/useTheme'
import { Button } from './ui/button'
import { MoonIcon, SunIcon } from 'lucide-react'
export default function ThemeToggleButton() {
	const { theme, toggleTheme } = useTheme()
	return (
		<Button variant={'outline'} className='p-2' onClick={() => toggleTheme()}>
			{theme == 'dark' ? <MoonIcon /> : <SunIcon />}
		</Button>
	)
}
