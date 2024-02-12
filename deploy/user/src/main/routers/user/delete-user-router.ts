import { type Router } from 'express'
import { expressAdapter } from '../../../infra/adapters'
import { deleteUserControllerFactory } from '../../../main/factory/controller/delete-user-controller-factory'
import { authMiddleware } from '../../../main/middlewares'
import { type AppSecurity, Permissions, permissionMiddeware } from '../../../main/middlewares/permission-middleware'

export const deleteUserRouter = (router: Router): void => {
  const appSecurity: AppSecurity = {
    app: {
      name: 'user',
      id: '1',
      module: [{
        name: 'delete',
        id: '3',
        accepted: Permissions.delete
      }]
    }
  }
  router.delete('/user/delete', authMiddleware, permissionMiddeware(appSecurity), expressAdapter(deleteUserControllerFactory()))
}
