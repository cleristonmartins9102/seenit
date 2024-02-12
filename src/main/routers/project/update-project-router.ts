import { type Router } from 'express'
import { expressAdapter } from '../../../infra/adapters'
import { updateUserControllerFactory } from '../../factory/controller'
import { authMiddleware } from '../../middlewares'
import { permissionMiddeware } from '../../middlewares/permission-middleware'
import { updateProjectControllerFactory } from '../../../main/factory/controller/update-project-controller-factory'

export const updateProjectRouter = (router: Router): void => {
  router.post('/project/update', authMiddleware, permissionMiddeware('CRUD'), expressAdapter(updateProjectControllerFactory()))
}
