import { type Router } from 'express'
import { expressAdapter } from '../../../infra/adapters'
import { authMiddleware } from '../../middlewares/auth-middleware'
import { permissionMiddeware } from '../../middlewares/permission-middleware'
import { createProjectControllerFactory } from '../../../main/factory/controller/create-project-controller-factory'

export const createProjectRouter = (router: Router): void => {
  router.put('/project/create', authMiddleware, permissionMiddeware('CRUD'), expressAdapter(createProjectControllerFactory()))
}
