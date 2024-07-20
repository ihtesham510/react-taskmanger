import BarCharter from './BarChart'
import Projects from './Projects'
import useFetchProjects from '@/Hooks/useFetchProjects'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '@/components/Loading'

const Overview = () => {
	const { data, isLoading, isError } = useFetchProjects()
	const navigate = useNavigate()

	useEffect(() => {
		if (isError) {
			navigate('/error')
		}
	}, [isError, navigate])

	if (isLoading && !data) return <Loading />
	const statuses = ['completed', 'ongoing', 'todo', 'cancelled', 'paused']
	const statusesCounts = statuses.map(
		status =>
			data?.reduce((count, project) => {
				const completedTasks = project.tasks?.filter(task => task.status === status).length || 0
				return count + completedTasks
			}, 0) || 0,
	)
	return (
		<>
			<div className='flex flex-col lg:flex-row'>
				<BarCharter statusCounts={statusesCounts} />
				<Projects projects={data} />
			</div>
		</>
	)
}

export default Overview
