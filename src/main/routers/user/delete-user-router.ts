import { type Router } from 'express'
import { expressAdapter } from '../../../infra/adapters'
import { deleteUserControllerFactory } from '../../../main/factory/controller/delete-user-controller-factory'
import { authMiddleware } from '../../../main/middlewares'
import { permissionMiddeware } from '../../../main/middlewares/permission-middleware'

export const deleteUserRouter = (router: Router): void => {
  router.delete('/user/delete', authMiddleware, permissionMiddeware('CRUD'), expressAdapter(deleteUserControllerFactory()))
}
