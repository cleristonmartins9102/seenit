import { Router, type Express } from 'express'
import { signupRouter, updateUserRouter, loadUsersRouter } from '../routers/user'
import { deleteUserRouter } from '../../main/routers/user/delete-user-router'

export const setupRouters = (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  signupRouter(router)
  updateUserRouter(router)
  loadUsersRouter(router)
  deleteUserRouter(router)
}
