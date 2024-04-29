import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useUser } from '@/context/UserContext'
interface Form {
	first_name: string
	last_name: string | undefined
	email: string
	password: string
}
export function SignUpForm() {
	const { toast } = useToast()
	const { setUser } = useUser()
	const [form, setForm] = useState<Form>({
		first_name: '',
		last_name: '',
		email: '',
		password: '',
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
		setForm(prev => ({ ...prev, [key]: e.target.value }))
	}

	const handleSubmit = useCallback(async () => {
		for (const key in form) {
			if (key in form) {
				if (form[key as keyof Form] === '') return toast({ variant: 'destructive', title: `${key} is reqired` })
			}
		}
		try {
			const config = {
				withCredentials: true,
			}
			const res = await axios.post('http://localhost:3000/signup', form, config)
			setUser(res.data)
		} catch (err) {
			toast({ variant: 'destructive', title: 'Server Error', description: `${err}` })
		}
	}, [form])

	return (
		<div className='h-screen w-screen flex justify-center items-center'>
			<Card className='mx-auto max-w-sm'>
				<CardHeader>
					<CardTitle className='text-xl'>Sign Up</CardTitle>
					<CardDescription>Enter your information to create an account</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='grid gap-4'>
						<div className='grid grid-cols-2 gap-4'>
							<div className='grid gap-2'>
								<Label htmlFor='first-name'>First name</Label>
								<Input
									id='first name'
									placeholder='Max'
									required
									value={form.first_name}
									onChange={e => handleChange(e, 'first_name')}
								/>
							</div>
							<div className='grid gap-2'>
								<Label htmlFor='last-name'>Last name</Label>
								<Input
									id='last name'
									placeholder='Robinson'
									required
									aria-errormessage='hellow'
									value={form.last_name}
									onChange={e => handleChange(e, 'last_name')}
								/>
							</div>
						</div>
						<div className='grid gap-2'>
							<Label htmlFor='email'>Email</Label>
							<Input
								id='Email'
								type='email'
								placeholder='m@example.com'
								required
								value={form.email}
								onChange={e => handleChange(e, 'email')}
							/>
						</div>
						<div className='grid gap-2'>
							<Label htmlFor='password'>Password</Label>
							<Input id='Password' type='password' value={form.password} onChange={e => handleChange(e, 'password')} />
						</div>
						<Button type='submit' className='w-full' onClick={handleSubmit}>
							Create an account
						</Button>
					</div>
					<div className='mt-4 text-center text-sm'>
						Already have an account?
						<Link to={'/signin'} className='underline'>
							Sign in
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
