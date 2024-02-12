import { LoadUsersController } from '../../../application/controller'
import { UserRepository } from '../../../infra/repository/user-repository'

export const loadUserControllerFactory = (): LoadUsersController => {
  return new LoadUsersController(new UserRepository())
}
