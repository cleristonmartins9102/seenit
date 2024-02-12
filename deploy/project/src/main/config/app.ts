import express, { json } from 'express'
import cors from 'cors'
import { setupRouters } from './router'
import { setupSwagger } from '../../main/swagger/setup-swagger'

const app = express()
setupSwagger(app)
app.use(cors())
app.use(json())
setupRouters(app)

export { app }
