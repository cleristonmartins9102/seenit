import { type Router } from 'express'
import { expressAdapter } from '../../../infra/adapters'
import { authMiddleware } from '../../middlewares/auth-middleware'
import { type AppSecurity, permissionMiddeware, Permissions } from '../../middlewares/permission-middleware'
import { loadProjectsControllerFactory } from '../../../main/factory/controller/load-projects-controller-factory'

export const loadProjectRouter = (router: Router): void => {
  const appSecurity: AppSecurity = {
    app: {
      name: 'project',
      id: '2',
      module: [{
        name: 'load',
        id: '2',
        accepted: Permissions.read
      }]
    }
  }
  router.get('/project/load', authMiddleware, permissionMiddeware(appSecurity), expressAdapter(loadProjectsControllerFactory()))
}
