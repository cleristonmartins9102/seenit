import { RequiredParameterError } from '../../src/application/errors'
import { type Validation } from '../../src/services/contract/validation'

interface InputType {
  [key: string]: unknown
}

export class RequiredParameterValidator implements Validation {
  constructor (private readonly fieldName: string) { }

  validate (input: InputType): Error | null {
    if (!input || input[this.fieldName] === undefined) return new RequiredParameterError(this.fieldName)
    return null
  }
}
