import express, { Application } from 'express'
import dotenv from 'dotenv'
import { ApplicationRun } from './controller/Application'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'

import userRouter from './routes/user'

dotenv.config()

const app: Application = express()

app.use(helmet())
app.use(cors({origin: '*'})); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', userRouter)

app.listen(process.env.PORT, ApplicationRun)