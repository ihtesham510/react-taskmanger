import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import RegisterImage from '@/components/RegisterImage'
import axios from 'axios'

interface Form {
	email: string
	password: string
	first_name: string
	last_name?: string
	confirmpassword: string
}

function Register() {
	const FormSchema = yup.object().shape({
		email: yup.string().email().required().typeError('Incorrect Email format'),
		password: yup.string().min(8).max(30).required(),
		first_name: yup.string().min(2, 'First Name must be at least 2 characters long').required(),
		last_name: yup.string().min(2, 'First Name must be at least 2 characters long'),
		confirmpassword: yup
			.string()
			.required()
			.oneOf([yup.ref('password')], 'Your passwords do not match.'),
	})
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Form>({ resolver: yupResolver(FormSchema) })
	const onSubmit = (data: Form) => {
		axios
			.post('http://localhost:3000/signup', data)
			.then(res => {
				console.log(res.data)
			})
			.catch(err => console.log(err))
	}
	return (
		<div className='w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]'>
			<div className='flex items-center justify-center py-12'>
				<div className='mx-auto grid w-[350px] gap-6'>
					<div className='grid gap-2 text-center'>
						<h1 className='text-3xl font-bold'>Register</h1>
						<p className='text-balance text-muted-foreground'>
							Enter your email and password below to create your account
						</p>
					</div>
					<form className='grid gap-4' onSubmit={handleSubmit(onSubmit)}>
						<div className='flex gap-2'>
							<div className='grid gap-2'>
								<Label htmlFor='first_name'>First Name</Label>
								<Input id='first_name' {...register('first_name')} type='text' required />
								<p className='text-red-400 text-xs'>{errors.first_name?.message}</p>
							</div>
							<div className='grid gap-2'>
								<Label htmlFor='last_name'>Last Name</Label>
								<Input id='last_name' type='text' required {...register('last_name')} />
								<p className='text-red-400 text-xs'>{errors.last_name?.message}</p>
							</div>
						</div>

						<div className='grid gap-2'>
							<Label htmlFor='email'>Email</Label>
							<Input
								id='email'
								type='email'
								placeholder='m@example.com'
								required
								{...register('email')}
							/>
							<p className='text-red-400 text-xs'>{errors.email?.message}</p>
						</div>

						<div className='grid gap-2'>
							<Label htmlFor='password'>password</Label>
							<Input id='password' type='password' required {...register('password')} />
							<p className='text-red-400 text-xs'>{errors.password?.message}</p>
						</div>

						<div className='grid gap-2'>
							<Label htmlFor='confirmpassword'>Confirm Password</Label>
							<Input id='confirmpassword' type='password' required {...register('confirmpassword')} />
							<p className='text-red-400 text-xs'>{errors.confirmpassword?.message}</p>
						</div>

						<Button type='submit' className='w-full'>
							Login
						</Button>
					</form>
					<div className='mt-4 text-center text-sm'>
						Already have an account?{' '}
						<Link to='/login' className='underline'>
							Login
						</Link>
					</div>
				</div>
			</div>
			<div className='hidden bg-primary-foreground  lg:flex lg:justify-center lg:items-center'>
				<RegisterImage className='size-72 m-9' />
			</div>
		</div>
	)
}
export default Register
