import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { useUser } from '@/context/UserContext'
import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
interface User {
	email: string
	password: string
}
export default function LoginForm() {
	const [form, setForm] = useState<User>({ email: '', password: '' })
	const { setUser } = useUser()
	const { toast } = useToast()
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm(prev => ({ ...prev, [e.target.id]: e.target.value }))
	}
	const handleSubmit = async () => {
		for (const key in form) {
			if (form[key as keyof User] === '') return toast({ variant: 'destructive', title: `${key} is required` })
		}
		try {
			const config = {
				withCredentials: true,
			}
			const res = await axios.post('http://localhost:3000/signin', form, config)
			setUser(res.data._doc)
		} catch (err) {
			toast({ variant: 'destructive', title: `${err}` })
		}
	}
	return (
		<div className='h-screen w-screen flex justify-center items-center'>
			<Card className='w-full max-w-sm'>
				<CardHeader>
					<CardTitle className='text-2xl'>Login</CardTitle>
					<CardDescription>Enter your email below to login to your account.</CardDescription>
				</CardHeader>
				<CardContent className='grid gap-4'>
					<div className='grid gap-2'>
						<Label htmlFor='email'>Email</Label>
						<Input
							id='email'
							type='email'
							placeholder='john@example.com'
							required
							value={form.email}
							onChange={handleChange}
						/>
					</div>
					<div className='grid gap-2'>
						<Label htmlFor='password'>Password</Label>
						<Input id='password' type='password' required onChange={handleChange} value={form.password} />
					</div>
				</CardContent>
				<CardFooter className='flex flex-col'>
					<Button className='w-full' onClick={handleSubmit}>
						Sign in
					</Button>
					<div className='mt-4 text-center text-sm'>
						Don't have an account?{' '}
						<Link to='/signup' className='underline'>
							Sign up
						</Link>
					</div>
				</CardFooter>
			</Card>
		</div>
	)
}
