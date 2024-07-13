import { LoaderCircle } from 'lucide-react'

const Loading = () => {
	return (
		<div className='flex h-screen w-full justify-center items-center'>
			<LoaderCircle className='size-16 animate-spin' />
		</div>
	)
}

export default Loading
