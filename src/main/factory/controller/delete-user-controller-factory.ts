import { DeleteUserController } from '../../../application/controller'
import { UserRepository } from '../../../infra/repository/user-repository'
import { ValidatorComposite } from '../../../validators'
import { RequiredParameterValidator } from '../../../validators/required-parameter-validator'

export const deleteUserControllerFactory = (): DeleteUserController => {
  const validators = [
    new RequiredParameterValidator('id')
  ]
  const validator = new ValidatorComposite(validators)
  return new DeleteUserController(validator, new UserRepository())
}
