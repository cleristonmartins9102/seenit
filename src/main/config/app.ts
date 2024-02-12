import express, { json } from 'express'
import cors from 'cors'
import { setupRouters } from './router'
import { setupSwagger } from '../../main/swagger/setup-swagger'
import { setupGraphql } from '../../main/graphql/setup-graphql'

const app = express()
setupGraphql(app)
setupSwagger(app)
app.use(cors())
app.use(json())
setupRouters(app)

export { app }
