import { type Router } from 'express'
import { expressAdapter } from '../../../infra/adapters'
import { authMiddleware } from '../../middlewares/auth-middleware'
import { permissionMiddeware } from '../../middlewares/permission-middleware'
import { loadProjectsControllerFactory } from '../../../main/factory/controller/load-projects-controller-factory'

export const loadProjectRouter = (router: Router): void => {
  router.get('/project/load', authMiddleware, permissionMiddeware('CRUD'), expressAdapter(loadProjectsControllerFactory()))
}
