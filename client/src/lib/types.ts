export interface TTask {
	id: string
	title: string
	status: string
	tags: string[]
	projectId?: string
}

export interface TProject {
	id: string
	name: string
	description: string
	hashTags: string[]
	technologies: string[]
	dateCreated: Date
	userId: string
	tasks?: TTask[]
}

export interface User {
	id: string
	email: string
	password: string
	first_name: string
	last_name?: string
}
