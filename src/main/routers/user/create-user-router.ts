import { type Router } from 'express'
import { expressAdapter } from '../../../infra/adapters'
import { createUserControllerFactory } from '../../factory/controller/create-user-controller-factory'

export const createUserRouter = (router: Router): void => {
  router.put('/user/create', expressAdapter(createUserControllerFactory()))
}
