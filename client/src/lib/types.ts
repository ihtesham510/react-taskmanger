export interface Task {
	id: string
	title: string
	status: string
	description: string
	Project?: string
}
export interface TProject {
	id: string
	name: string
	description: string
	dateCreated: Date
	userId: string
	tasks?: Task[]
}
