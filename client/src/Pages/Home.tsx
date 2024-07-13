import { Button } from '@/components/ui/button'
import { useTheme } from '@/Hooks/useTheme'

const Home = () => {
	const { theme, switchTheme } = useTheme()
	return (
		<div>
			<Button onClick={switchTheme}>Theme : {theme} </Button>
		</div>
	)
}

export default Home
