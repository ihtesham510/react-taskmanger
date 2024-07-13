import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import useUser from '@/Hooks/useUser'
import { useEffect } from 'react'
import { User } from '@/context/UserContext'

interface Form {
	email: string
	password: string
}

export default function Login() {
	const { user, setUser } = useUser()
	const FormSchema = yup.object().shape({
		email: yup.string().email().required(),
		password: yup.string().min(8).max(30).required(),
	})
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Form>({ resolver: yupResolver(FormSchema) })
	useEffect(() => {
		console.log(user)
	}, [user])
	const onSubmit = (data: Form) => {
		axios
			.post('http://localhost:3000/signin', data, { withCredentials: true })
			.then(res => setUser(res.data as User))
			.catch(err => console.log(err))
	}

	return (
		<div className='flex h-screen w-full justify-center items-center'>
			<Card className='mx-auto max-w-sm'>
				<CardHeader>
					<CardTitle className='text-2xl'>Login</CardTitle>
					<CardDescription>Enter your email below to login to your account</CardDescription>
				</CardHeader>
				<CardContent>
					<form className='grid gap-4' onSubmit={handleSubmit(onSubmit)}>
						<div className='grid gap-2'>
							<Label htmlFor='email'>Email</Label>
							<Input
								id='email'
								type='email'
								placeholder='m@example.com'
								{...register('email')}
								required
							/>
							<p className='text-red-400 text-xs'>{errors.email?.message}</p>
						</div>
						<div className='grid gap-2'>
							<Label htmlFor='password'>Password</Label>
							<Input id='password' type='password' required {...register('password')} />
							<p className='text-red-400 text-xs'>{errors.password?.message}</p>
						</div>
						<Button type='submit' className='w-full'>
							Login
						</Button>
					</form>
					<div className='mt-4 text-center text-sm'>
						Don&apos;t have an account?{' '}
						<Link to='/register' className='underline'>
							Sign up
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
