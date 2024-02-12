import { type Router } from 'express'
import { expressAdapter } from '../../../infra/adapters'
import { updateUserControllerFactory } from '../../../main/factory/controller'
import { authMiddleware } from '../../../main/middlewares'
import { permissionMiddeware } from '../../../main/middlewares/permission-middleware'

export const updateUserRouter = (router: Router): void => {
  router.post('/user/update', authMiddleware, permissionMiddeware('CRUD'), expressAdapter(updateUserControllerFactory()))
}
