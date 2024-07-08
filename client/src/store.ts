import axios from 'axios'
import { User } from 'lucide-react'
import { create } from 'zustand'

export type Theme = 'dark' | 'light'

export interface User {
	_id: string
	email: string
	first_name: string
	last_name?: string
	password: string
	_v: number
}
interface UserStore {
	user: User | undefined | 'loading'
	setUser: (user: User | undefined | 'loading') => void
	getAuth: () => void
}

interface ThemeStore {
	theme: Theme
	switchTheme: () => void
}

const initialTheme =
	localStorage.theme === 'dark' ||
	(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)

export const useThemeStore = create<ThemeStore>(set => ({
	theme: initialTheme ? 'dark' : 'light',
	switchTheme: () => set(state => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
}))

export const useUserStore = create<UserStore>(set => ({
	user: undefined,
	setUser: user => set({ user: user }),
	getAuth: async () => {
		set({ user: 'loading' })
		axios
			.get('http://localhost:3000/auth', { withCredentials: true })
			.then(res => set({ user: res.data }))
			.catch(err => {
				set({ user: undefined })
				console.log(err)
			})
	},
}))
