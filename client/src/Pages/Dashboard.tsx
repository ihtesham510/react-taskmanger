import { Button } from '@/components/ui/button'
import useUser from '@/Hooks/useUser'

const Dashboard = () => {
	const { signOut } = useUser()

	return (
		<div>
			Dashboard
			<br />
			<Button onClick={signOut}>Sign Out</Button>
		</div>
	)
}

export default Dashboard
