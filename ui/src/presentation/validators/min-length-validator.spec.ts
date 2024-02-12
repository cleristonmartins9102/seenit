import { UnexpectedError } from '../errors/unexpected-error'
import { MinLengthValidator } from './min-length-validator'

describe('MinValidator', () => {
  test('Should returns an error', async () => {
    const sut = new MinLengthValidator('email', 10)
    expect(sut.validate('any')).toEqual(new UnexpectedError('Minimum of character required is 10'))
  })

  test('Should returns a RequiredFieldError if field is null', async () => {
    const sut = new MinLengthValidator('email', 3)
    expect(sut.validate('any')).toBeFalsy()
  })
})
