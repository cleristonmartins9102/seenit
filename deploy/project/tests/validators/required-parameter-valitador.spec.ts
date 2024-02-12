import { RequiredParameterError } from '../../src/application/errors'
import { RequiredParameterValidator } from '../../src/validators/required-parameter-validator'

describe('required parameter validator', () => {
  it('should returns null if no there error', () => {
    const sut = new RequiredParameterValidator('any')

    const error = sut.validate({ any: '10' })

    expect(error).toBeNull()
  })

  it('should returns error if validator fails', () => {
    const sut = new RequiredParameterValidator('any')

    const error = sut.validate({})

    expect(error).toEqual(new RequiredParameterError('any'))
  })
})
