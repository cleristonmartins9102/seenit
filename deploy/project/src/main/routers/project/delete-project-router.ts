import { type Router } from 'express'
import { expressAdapter } from '../../../infra/adapters'
import { authMiddleware } from '../../middlewares'
import { type AppSecurity, permissionMiddeware, Permissions } from '../../middlewares/permission-middleware'
import { deleteProjectControllerFactory } from '../../../main/factory/controller/delete-project-controller-factory'

export const deleteProjectRouter = (router: Router): void => {
  const appSecurity: AppSecurity = {
    app: {
      name: 'project',
      id: '2',
      module: [{
        name: 'delete',
        id: '4',
        accepted: Permissions.delete
      }]
    }
  }
  router.delete('/project/delete', authMiddleware, permissionMiddeware(appSecurity), expressAdapter(deleteProjectControllerFactory()))
}
