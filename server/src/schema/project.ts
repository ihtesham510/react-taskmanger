import * as yup from 'yup'
export const projectSchema = yup.object().shape({
  name: yup.string().min(2).required(),
  description: yup.string().min(10).required(),
  userId: yup.string().required(),
})
