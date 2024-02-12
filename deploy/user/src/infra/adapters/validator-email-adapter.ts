import * as EmailValidator from 'email-validator'

import { EmailError } from '../../application/errors'
import { type Validation } from '../../domain/validation'

export class EmailValidatorAdapter implements Validation {
  validate (input: { email: string }): Error | null {
    const error = EmailValidator.validate(input.email)
    return error ? null : new EmailError(input.email)
  }
}
