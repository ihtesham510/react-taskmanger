import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { default as userRoute } from './routes/userRoute.js'

dotenv.config()
const app = express()
const port = process.env.PORT || 3000
const mongo_uri = process.env.MONGO_URI || 'mongodb://localhost:27017/'

app.use(cors())
app.use(bodyParser())
app.use(cookieParser())
app.use(userRoute)

mongoose.connect(mongo_uri)
mongoose.connection.on('error', () => console.log('Error while Connecting to the database'))
mongoose.connection.once('open', () => console.log('Connected to the database'))
app.listen(port, () => console.log(`App is running on http://localhost:${port}`))
