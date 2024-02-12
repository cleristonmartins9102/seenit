import { EmailValidatorAdapter } from '../../../src/infra/adapters/validator-email-adapter'
import { EmailError } from '../../../src/application/errors'

describe('email validator', () => {
  it('should return an error same email-validator lib if error', () => {
    const sut = new EmailValidatorAdapter()

    const error = sut.validate({ email: 'fail_email.com' })

    expect(error).toEqual(new EmailError('fail_email.com'))
  })
})
