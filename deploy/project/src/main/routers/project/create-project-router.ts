import { type Router } from 'express'
import { expressAdapter } from '../../../infra/adapters'
import { authMiddleware } from '../../middlewares/auth-middleware'
import { type AppSecurity, permissionMiddeware, Permissions } from '../../middlewares/permission-middleware'
import { createProjectControllerFactory } from '../../../main/factory/controller/create-project-controller-factory'

export const createProjectRouter = (router: Router): void => {
  const appSecurity: AppSecurity = {
    app: {
      name: 'project',
      id: '2',
      module: [{
        name: 'create',
        id: '1',
        accepted: Permissions.create
      }]
    }
  }
  router.put('/project/create', authMiddleware, permissionMiddeware(appSecurity), expressAdapter(createProjectControllerFactory()))
}
