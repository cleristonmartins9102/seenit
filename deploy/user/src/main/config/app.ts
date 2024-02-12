import express, { json } from 'express'
import cors from 'cors'
import { setupRouters } from './router'
import { setupSwagger } from '../../main/swagger/setup-swagger'
import cookieSession from 'cookie-session'

const app = express()
app.use('/images', express.static('public/images'))
app.use(cookieSession({
  signed: false,
  secure: false,
  name: 'seenit'
}))
setupSwagger(app)
app.use(cors())
app.use(json({ limit: '10mb' }))
setupRouters(app)

export { app }
