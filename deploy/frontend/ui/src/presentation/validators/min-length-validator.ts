import { RequiredFieldError } from '../errors/required-field-error'
import { UnexpectedError } from '../errors/unexpected-error'
import { Validation } from '../protocols/validation'

export class MinLengthValidator implements Validation<string> {
  constructor (
    public readonly fieldName: string,
    public readonly min: number
  ) {}

  validate (value: string): Error | null {
    if (value.length >= this.min) return null
    return new UnexpectedError(`Minimum of character required is ${this.min}`)
  }
}
