import { useTheme } from '@/Hooks/useTheme'
import { Button } from './ui/button'
import { MoonIcon, SunIcon } from 'lucide-react'

interface Props {
	className?: string
}
const ThemeButton: React.FC<Props> = ({ className }) => {
	const { theme, switchTheme } = useTheme()
	return (
		<div className={className}>
			<Button onClick={switchTheme} variant='outline' size='icon'>
				{theme == 'dark' ? (
					<MoonIcon className='w-[20px] h-[20px]' />
				) : (
					<SunIcon className='w-[20px] h-[20px]' />
				)}
			</Button>
		</div>
	)
}

export default ThemeButton
