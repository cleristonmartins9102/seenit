import { type Controller } from '../../../../src/application/contract'
import mock, { type MockProxy } from 'jest-mock-extended/lib/Mock'
import { type Validation } from '../../../../src/domain/validation'
import { createUserModelMock, userModelMock } from '../../../../src/application/mocks/create-user-model-mock'
import { type UpdateUser, type CreateUser } from '../../../../src/domain/user-contracts'
import { SignupController } from '../../../../src/application/controller'
import { type SaveFile, type Hasher } from '../../../../src/domain'
import { type Encrypter } from '../../../../src/domain/encrypter'
import { Permissions, type AppSecurity } from '../../../../src/main/middlewares/permission-middleware'

describe('signup controller', () => {
  let validatorStub: MockProxy<Validation>
  let userRepositorySpy: MockProxy<CreateUser & UpdateUser>
  let crypetorAdapterSpy: MockProxy<Hasher>
  let jwtAdapterSpy: MockProxy<Encrypter>
  let fileStorageAdapter: MockProxy<SaveFile>
  let sut: Controller
  const defaultPermissions: AppSecurity[] = [
    {
      app: {
        name: 'user',
        id: '1',
        module: [
          {
            name: 'load',
            id: '1',
            accepted: Permissions.read
          },
          {
            name: 'update',
            id: '2',
            accepted: Permissions.update
          },
          {
            name: 'delete',
            id: '3',
            accepted: Permissions.delete
          }
        ]
      }
    },
    {
      app: {
        name: 'project',
        id: '2',
        module: [
          {
            name: 'create',
            id: '1',
            accepted: Permissions.create
          },
          {
            name: 'load',
            id: '2',
            accepted: Permissions.read
          },
          {
            name: 'update',
            id: '3',
            accepted: Permissions.update
          },
          {
            name: 'delete',
            id: '4',
            accepted: Permissions.delete
          }
        ]
      }
    }

  ]

  beforeAll(() => {
    userRepositorySpy = mock()
    jwtAdapterSpy = mock()
    validatorStub = mock()
    crypetorAdapterSpy = mock()
    fileStorageAdapter = mock()
    fileStorageAdapter.save.mockResolvedValue({ url: 'http://any_url' })
    jwtAdapterSpy.encrypt.mockResolvedValue('any_token_encrypterd')
    crypetorAdapterSpy.hash.mockResolvedValue('any_hashed_password')
    validatorStub.validate.mockReturnValue(null)
    userRepositorySpy.create.mockReturnValue(userModelMock)
  })

  beforeEach(() => {
    userRepositorySpy.create.mockClear()
    jwtAdapterSpy.encrypt.mockClear()
    userRepositorySpy.update.mockClear()
    sut = new SignupController(validatorStub, userRepositorySpy, crypetorAdapterSpy, jwtAdapterSpy, fileStorageAdapter)
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

  it('should call CryptorAdapter with correct password', async () => {
    await sut.handle({ body: createUserModelMock })

    expect(crypetorAdapterSpy.hash).toHaveBeenCalled()
    expect(crypetorAdapterSpy.hash).toHaveBeenCalledWith(createUserModelMock.password)
  })

  it('should call JwtAdapter with correct data', async () => {
    await sut.handle({ body: createUserModelMock })

    expect(jwtAdapterSpy.encrypt).toHaveBeenCalled()
    expect(jwtAdapterSpy.encrypt).toHaveBeenCalledWith({ id: userModelMock.id, firstName: createUserModelMock.firstName, surname: createUserModelMock.surname, email: createUserModelMock.email, permissions: defaultPermissions })
  })

  it('should call FileStorageAdapter save with correct value', async () => {
    await sut.handle({ body: createUserModelMock })

    expect(fileStorageAdapter.save).toHaveBeenCalled()
    expect(fileStorageAdapter.save).toHaveBeenCalledWith({ fileName: createUserModelMock.avatar.fileName, extension: createUserModelMock.avatar.extension, base64: createUserModelMock.avatar.base64 })
  })

  it('should call create user with correct value', async () => {
    await sut.handle({ body: createUserModelMock })

    expect(userRepositorySpy.create).toHaveBeenCalled()
    expect(userRepositorySpy.create).toHaveBeenCalledWith({ ...createUserModelMock, password: 'any_hashed_password', permissions: defaultPermissions })
  })

  it('should call update user with correct value', async () => {
    jwtAdapterSpy.encrypt.mockResolvedValueOnce('token').mockResolvedValueOnce('refresh_token')
    await sut.handle({ body: createUserModelMock })

    expect(userRepositorySpy.update).toHaveBeenCalled()
    expect(userRepositorySpy.update).toHaveBeenCalledWith({ id: userModelMock.id, token: 'token', refresh_token: 'refresh_token' })
  })

  it('should returns 201 with correct created user', async () => {
    const { avatar, password, ...bodyWithoutAvatar } = createUserModelMock
    const user = await sut.handle({ body: createUserModelMock })
    expect(user).toEqual({ statusCode: 201, body: { ...bodyWithoutAvatar, avatarUrl: 'http://any_url', token: 'any_token_encrypterd', refresh_token: 'any_token_encrypterd' } })
  })

  it('should returns 500 if JwtAdapter fails', async () => {
    jwtAdapterSpy.encrypt.mockRejectedValueOnce(new Error('fails'))
    const user = await sut.handle({ body: createUserModelMock })
    expect(user).toEqual({ statusCode: 500, body: { error: 'fails' } })
  })
})
