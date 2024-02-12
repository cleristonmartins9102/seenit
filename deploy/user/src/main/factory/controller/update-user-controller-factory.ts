import { UpdateUserController } from '../../../application/controller'
import { UserRepository } from '../../../infra/repository/user-repository'
import { ValidatorComposite } from '../../../validators'
import { RequiredParameterValidator } from '../../../validators/required-parameter-validator'

export const updateUserControllerFactory = (): UpdateUserController => {
  const validators = [
    new RequiredParameterValidator('id')
  ]
  const validator = new ValidatorComposite(validators)
  return new UpdateUserController(validator, new UserRepository())
}
