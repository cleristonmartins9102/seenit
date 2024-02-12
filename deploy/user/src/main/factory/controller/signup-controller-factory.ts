import { EmailValidatorAdapter } from '../../../infra/adapters/validator-email-adapter'
import { SignupController } from '../../../application/controller'
import { UserRepository } from '../../../infra/repository/user-repository'
import { CheckEmailExistsValidator, ValidatorComposite } from '../../../validators'
import { RequiredParameterValidator } from '../../../validators/required-parameter-validator'
import { CryptoAdapter } from '../../../infra/adapters/crypto-adapter'
import { JwtAdapter } from '../../../infra/adapters/jwt-adapter'
import { FileStorageAdapter } from '../../../infra/adapters/file-storage-adapter'

export const signupControllerFactory = (): SignupController => {
  const validators = [
    new RequiredParameterValidator('firstName'),
    new RequiredParameterValidator('surname'),
    new RequiredParameterValidator('email'),
    new RequiredParameterValidator('password'),
    new RequiredParameterValidator('avatar'),
    new EmailValidatorAdapter(),
    new CheckEmailExistsValidator(new UserRepository())
  ]
  const validator = new ValidatorComposite(validators)

  return new SignupController(validator, new UserRepository(), new CryptoAdapter(), new JwtAdapter(), new FileStorageAdapter())
}
