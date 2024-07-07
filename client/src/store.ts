import { create } from 'zustand'

type Theme = 'dark' | 'light'

interface User {
	_id: string
	email: string
	first_name: string
	last_name?: string
	password: string
	_v: number
}
interface UserStore {
	user: User | undefined
	setUser: (user: User | undefined) => void
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
}))
