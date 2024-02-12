import { type Controller } from '../../../../src/application/contract'
import mock, { type MockProxy } from 'jest-mock-extended/lib/Mock'
import { type Validation } from '../../../../src/domain/validation'
import { type DeleteUser } from '../../../../src/domain/user-contracts'
import { DeleteUserController } from '../../../../src/application/controller'

describe('delete user controller', () => {
  let validatorStub: MockProxy<Validation>
  let userRepositorySpy: MockProxy<DeleteUser>
  let sut: Controller

  beforeAll(() => {
    userRepositorySpy = mock()
    validatorStub = mock()
    validatorStub.validate.mockReturnValue(null)
    userRepositorySpy.delete.mockReturnValue(true)
  })

  beforeEach(() => {
    sut = new DeleteUserController(validatorStub, userRepositorySpy)
  })

  it('should call validate with correct value', async () => {
    await sut.handle({ body: '' })

    expect(validatorStub.validate).toHaveBeenCalled()
  })

  it('should returns 400 if validator fails', async () => {
    validatorStub.validate.mockReturnValueOnce(new Error('missing parameter'))

    const response = await sut.handle({ body: '' })

    expect(response).toEqual({
      statusCode: 400,
      body: {
        error: 'missing parameter'
      }
    })
  })

  it('should call delete user with correct id', async () => {
    await sut.handle({ body: { id: 1 } })

    expect(userRepositorySpy.delete).toHaveBeenCalled()
    expect(userRepositorySpy.delete).toHaveBeenCalledWith(1)
  })

  it('should returns 200 with correct response', async () => {
    const user = await sut.handle({ body: { id: 1 } })

    expect(user).toEqual({ statusCode: 200, body: true })
  })
})
