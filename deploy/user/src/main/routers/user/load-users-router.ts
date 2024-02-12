import { type Router } from 'express'
import { expressAdapter } from '../../../infra/adapters'
import { loadUserControllerFactory } from '../../../main/factory/controller/load-user-controller-factory'
import { authMiddleware } from '../../../main/middlewares'
import { type AppSecurity, Permissions, permissionMiddeware } from '../../../main/middlewares/permission-middleware'

export const loadUsersRouter = (router: Router): void => {
  const appSecurity: AppSecurity = {
    app: {
      name: 'user',
      id: '1',
      module: [{
        name: 'load',
        id: '1',
        accepted: Permissions.read
      }]
    }
  }
  router.get('/user/load', authMiddleware, permissionMiddeware(appSecurity), expressAdapter(loadUserControllerFactory()))
}
