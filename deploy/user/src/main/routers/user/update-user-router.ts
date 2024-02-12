import { type Router } from 'express'
import { expressAdapter } from '../../../infra/adapters'
import { updateUserControllerFactory } from '../../../main/factory/controller'
import { authMiddleware } from '../../../main/middlewares'
import { type AppSecurity, Permissions, permissionMiddeware } from '../../../main/middlewares/permission-middleware'

export const updateUserRouter = (router: Router): void => {
  const appSecurity: AppSecurity = {
    app: {
      name: 'user',
      id: '1',
      module: [{
        name: 'update',
        id: '2',
        accepted: Permissions.update
      }]
    }
  }
  router.post('/user/update', authMiddleware, permissionMiddeware(appSecurity), expressAdapter(updateUserControllerFactory()))
}
