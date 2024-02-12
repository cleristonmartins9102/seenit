import { Validation } from '../protocols/validation'
import emailValidator from 'email-validator'
import { InvalidEmailError } from '../errors/invalid-email-error'

export class EmailValidate implements Validation {
  validate (email: string): Error {
    if (!emailValidator.validate(email)) {
      return new InvalidEmailError(email)
    }
    return null
  }
}
