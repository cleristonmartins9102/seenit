import { type Controller } from '../../../../src/application/contract'
import mock, { type MockProxy } from 'jest-mock-extended/lib/Mock'
import { createUserModelMock, userModelMock } from '../../../../src/application/mocks/create-user-model-mock'
import { type LoadUsers } from '../../../../src/domain/user-contracts'
import { LoadUsersController } from '../../../../src/application/controller'

describe('load users controller', () => {
  let userRepositorySpy: MockProxy<LoadUsers>
  let sut: Controller

  beforeAll(() => {
    userRepositorySpy = mock()
    userRepositorySpy.load.mockReturnValue([userModelMock])
  })

  beforeEach(() => {
    sut = new LoadUsersController(userRepositorySpy)
  })

  it('should call create user with correct value', async () => {
    await sut.handle({ body: '' })

    expect(userRepositorySpy.load).toHaveBeenCalled()
  })

  it('should returns 200 with correct created user', async () => {
    const user = await sut.handle({ body: createUserModelMock })

    expect(user).toEqual({ statusCode: 200, body: [userModelMock] })
  })
})
