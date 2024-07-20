import { Button } from '@/components/ui/button'
import CreateProjectDialog from './CreateProjectDialog'

const Projects = () => {
	return (
		<div>
			<CreateProjectDialog>
				<Button>create project</Button>
			</CreateProjectDialog>
		</div>
	)
}

export default Projects
