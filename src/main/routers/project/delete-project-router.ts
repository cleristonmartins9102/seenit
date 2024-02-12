import { type Router } from 'express'
import { expressAdapter } from '../../../infra/adapters'
import { authMiddleware } from '../../middlewares'
import { permissionMiddeware } from '../../middlewares/permission-middleware'
import { deleteProjectControllerFactory } from '../../../main/factory/controller/delete-project-controller-factory'

export const deleteProjectRouter = (router: Router): void => {
  router.delete('/project/delete', authMiddleware, permissionMiddeware('CRUD'), expressAdapter(deleteProjectControllerFactory()))
}
