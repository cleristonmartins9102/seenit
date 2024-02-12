import { type Router } from 'express'
import { expressAdapter } from '../../../infra/adapters'
import { authMiddleware } from '../../middlewares'
import { type AppSecurity, permissionMiddeware, Permissions } from '../../middlewares/permission-middleware'
import { updateProjectControllerFactory } from '../../../main/factory/controller/update-project-controller-factory'

export const updateProjectRouter = (router: Router): void => {
  const appSecurity: AppSecurity = {
    app: {
      name: 'project',
      id: '2',
      module: [{
        name: 'update',
        id: '3',
        accepted: Permissions.update
      }]
    }
  }
  router.post('/project/update', authMiddleware, permissionMiddeware(appSecurity), expressAdapter(updateProjectControllerFactory()))
}
