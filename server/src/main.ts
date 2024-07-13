import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { default as userRoute } from './routes/user'
import { default as projectRoute } from './routes/project'

dotenv.config()
const app = express()
const port = process.env.PORT || 3000

app.use(cors({ origin: ['http://localhost:3000', '*', 'http://localhost:5173'], credentials: true }))
app.use(bodyParser())
app.use(cookieParser())
app.use(userRoute)
app.use(projectRoute)

app.listen(port, () => console.log(`App is running on http://localhost:${port}`))
