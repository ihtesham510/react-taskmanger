import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Dialog,
	DialogHeader,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogDescription,
} from '@/components/ui/dialog'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { useCallback, useEffect, useState } from 'react'
import TagInput from '@/components/TagInput'
import { yupResolver } from '@hookform/resolvers/yup'
interface Form {
	name: string
	description: string
}
export function CreateProjectDialog({ children }: { children: React.ReactNode }) {
	const formSchema = yup.object().shape({
		name: yup.string().min(2).required(),
		description: yup.string().min(10).required(),
	})
	const [tags, setTags] = useState<string[] | undefined>()
	const onTagsChange = useCallback((newTags: string[]) => {
		setTags(newTags)
	}, [tags])
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<Form>({resolver:yupResolver(formSchema)})
	const onSubmit = useCallback((data: Form) => {
		console.log(data)
	},[])
	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Edit profile</DialogTitle>
					<DialogDescription>
						Make changes to your profile here. Click save when you're done.
					</DialogDescription>
				</DialogHeader>
				<form className='grid gap-4 py-4' onSubmit={handleSubmit(onSubmit)}>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='name' className='text-right'>
							Name
						</Label>
						<Input id='name' className='col-span-3' placeholder='Project Name' {...register('name')} />
            <p>{errors.name?.message}</p>
					</div>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='username' className='text-right'>
							Description
						</Label>
						<Input
							id='username'
							className='col-span-3'
							placeholder='Project Description'
							{...register('description')}
						/>
            <p>{errors.description?.message}</p>
					</div>
					<div>
						<TagInput
							placeholder='Enter Tag'
							onValueChange={onTagsChange}
						/>
					</div>
					<div className='mt-3 flex justify-end'>
						<Button type='submit'>Save changes</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	)
}
export default CreateProjectDialog
