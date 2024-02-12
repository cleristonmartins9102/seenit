import { type Controller } from '../../../../src/application/contract'
import mock, { type MockProxy } from 'jest-mock-extended/lib/Mock'
import { type Validation } from '../../../../src/domain/validation'
import { createUserModelMock, userModelMock } from '../../../../src/application/mocks/create-user-model-mock'
import { type UpdateUser } from '../../../../src/domain/user-contracts'
import { UpdateUserController } from '../../../../src/application/controller'

describe('update user controller', () => {
  let validatorStub: MockProxy<Validation>
  let userRepositorySpy: MockProxy<UpdateUser>
  let sut: Controller

  beforeAll(() => {
    userRepositorySpy = mock()
    validatorStub = mock()
    validatorStub.validate.mockReturnValue(null)
    userRepositorySpy.update.mockReturnValue(userModelMock)
  })

  beforeEach(() => {
    sut = new UpdateUserController(validatorStub, userRepositorySpy)
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

  it('should call create user with correct value', async () => {
    await sut.handle({ body: createUserModelMock })

    expect(userRepositorySpy.update).toHaveBeenCalled()
  })

  it('should returns 200 with correct created user', async () => {
    const user = await sut.handle({ body: createUserModelMock })

    expect(user).toEqual({ statusCode: 200, body: userModelMock })
  })
})
