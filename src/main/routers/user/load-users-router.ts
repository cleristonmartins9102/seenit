import { type Router } from 'express'
import { expressAdapter } from '../../../infra/adapters'
import { loadUserControllerFactory } from '../../../main/factory/controller/load-user-controller-factory'
import { authMiddleware } from '../../../main/middlewares'
import { permissionMiddeware } from '../../../main/middlewares/permission-middleware'

export const loadUsersRouter = (router: Router): void => {
  router.get('/user/load', authMiddleware, permissionMiddeware('CRUD'), expressAdapter(loadUserControllerFactory()))
}
