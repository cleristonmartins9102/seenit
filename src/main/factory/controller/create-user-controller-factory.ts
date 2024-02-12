import { EmailValidatorAdapter } from '../../../infra/adapters/validator-email-adapter'
import { CreateUserController } from '../../../application/controller'
import { UserRepository } from '../../../infra/repository/user-repository'
import { CheckEmailExistsValidator, ValidatorComposite } from '../../../validators'
import { RequiredParameterValidator } from '../../../validators/required-parameter-validator'

export const createUserControllerFactory = (): CreateUserController => {
  const validators = [
    new RequiredParameterValidator('firstName'),
    new RequiredParameterValidator('surname'),
    new RequiredParameterValidator('email'),
    new EmailValidatorAdapter(),
    new CheckEmailExistsValidator(new UserRepository())
  ]
  const validator = new ValidatorComposite(validators)
  return new CreateUserController(validator, new UserRepository())
}
