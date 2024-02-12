import { type Router } from 'express'
import { expressAdapter } from '../../../infra/adapters'
import { signupControllerFactory } from '../../factory/controller/signup-controller-factory'
import { cookieMiddlewareFactory } from '../../middlewares/cookie-middleware-factory'

export const signupRouter = (router: Router): void => {
  router.put('/user/signup', cookieMiddlewareFactory(), expressAdapter(signupControllerFactory()))
}
