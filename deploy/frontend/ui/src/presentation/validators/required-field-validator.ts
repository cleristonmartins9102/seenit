import { RequiredFieldError } from '../errors/required-field-error'
import { Validation } from '../protocols/validation'

export class RequiredFieldValidator implements Validation<string> {
  constructor (public readonly fieldName: string) {}
  validate (inputField: string): Error | null {
    if (!inputField) {
      return new RequiredFieldError(this.fieldName)
    } else {
      return null
    }
  }
}
