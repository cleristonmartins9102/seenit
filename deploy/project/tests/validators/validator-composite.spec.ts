import { type MockProxy } from 'jest-mock-extended'
import mock from 'jest-mock-extended/lib/Mock'
import { type Validation } from '../../src/services/contract/validation'
import { ValidatorComposite } from '../../src/validators'

describe('Validator composite', () => {
  let validatorStub: MockProxy<Validation>
  let sut: Validation
  beforeAll(() => {
    validatorStub = mock()
    validatorStub.validate.mockReturnValue(null)
  })

  beforeEach(() => {
    sut = new ValidatorComposite([validatorStub])
  })

  it('should call validators', () => {
    sut.validate({})

    expect(validatorStub.validate).toHaveBeenCalled()
  })

  it('should validate returns null if no error found', () => {
    const error = sut.validate({})

    expect(error).toBeNull()
  })

  it('should validate returns an error if validator fails', () => {
    validatorStub.validate.mockReturnValue(new Error('Fails'))

    const error = sut.validate({})

    expect(error).toEqual(new Error('Fails'))
  })
})
