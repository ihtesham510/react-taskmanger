import { Request, Response } from 'express'
import prisma from '../lib/prisma'

export const createProject = async (req: Request, res: Response) => {
  const { name, description, userId } = req.body
  try {
    const newProject = await prisma.project.create({
      data: {
        name: name,
        description: description,
        userId: userId,
        dateCreated: new Date(Date.now()),
      },
    })
    return res.status(200).json(newProject)
  } catch (err) {
    return res.status(500).json({ Error: 'Error while creating project' })
  }
}

export const getProject = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      include: { tasks: req.query.withTasks === 'true' },
      where: typeof req.query.userId === 'string' ? { userId: req.query.userId } : {},
    })
    return res.status(200).json(projects)
  } catch (err) {
    return res.status(500).json({ Error: 'Error while getting project' })
  }
}

export const getProjectbyID = async (req: Request, res: Response) => {
  try {
    const project = await prisma.project.findFirst({ where: { id: req.params.id } })
    if (!project) return res.status(404).json({ Error: 'Cannot find project' })
    return res.status(200).json(project)
  } catch (err) {
    return res.status(500).json({ Error: 'Error while getting project' })
  }
}

export const deleteProjects = async (req: Request, res: Response) => {
  try {
    const deletedPorjects = await prisma.project.deleteMany({})
    return res.status(200).json(deletedPorjects)
  } catch (err) {
    return res.status(500).json({ Error: 'Error while deleting projects' })
  }
}

export const deleteProjectbyId = async (req: Request, res: Response) => {
  try {
    const deletedProject = await prisma.project.delete({
      where: { id: req.params.id },
    })
    if (!deletedProject) return res.status(404).json({ Error: 'Cannot find project' })
  } catch (err) {
    return res.status(500).json({ Error: 'Error while deleting project' })
  }
}
