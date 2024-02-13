import { RequiredFieldError } from '../errors/required-field-error'
import { RequiredFieldValidator } from './required-field-validator'

describe('RequiredField', () => {
  test('Should returns null if no error', async () => {
    const sut = new RequiredFieldValidator('surname')
    expect(sut.validate('any_surname')).toBeNull()
  })

  test('Should returns a RequiredFieldError if field is null', async () => {
    const sut = new RequiredFieldValidator('name')
    expect(sut.validate('')).toEqual(new RequiredFieldError('name'))
  })
})
