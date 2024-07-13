import { NextFunction, Request, Response } from 'express'
import { ValidationError } from 'yup'
import { projectSchema } from '../schema/project'

export const validateProjectRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await projectSchema.validate(req.body)
    next()
  } catch (err) {
    if (err instanceof ValidationError) {
      const errors = err.inner.map(e => ({
        path: e.path,
        message: e.message,
      }))
      res.status(400).json({ errors })
    } else {
      next(err)
    }
  }
}
