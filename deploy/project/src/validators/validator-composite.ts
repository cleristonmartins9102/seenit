import { type Validation } from '../services/contract/validation'

export class ValidatorComposite implements Validation<unknown> {
  constructor (private readonly validators: Validation[]) {}

  validate (input: unknown): Error | null {
    for (const validator of this.validators) {
      const error = validator.validate(input)
      if (error) {
        return error
      }
    }
    return null
  }
}
