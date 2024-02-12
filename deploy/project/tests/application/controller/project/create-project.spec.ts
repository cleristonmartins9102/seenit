import { type Controller } from '../../../../src/application/contract'
import mock, { type MockProxy } from 'jest-mock-extended/lib/Mock'
import { type Validation } from '../../../../src/services/contract/validation'
import { CreateProjectController } from '../../../../src/application/controller'
import { type CreateProject } from '../../../../src/services/contract/project/project-contracts'
import { createProjectModelMock, projectModelMock, userModelMock } from '../../../../src/application/mocks/models-mock'

describe('create project controller', () => {
  let validatorStub: MockProxy<Validation>
  let projectRepositorySpy: MockProxy<CreateProject>
  let sut: Controller

  beforeAll(() => {
    projectRepositorySpy = mock()
    validatorStub = mock()
    validatorStub.validate.mockReturnValue(null)
    projectRepositorySpy.create.mockReturnValue(projectModelMock)
  })

  beforeEach(() => {
    projectRepositorySpy.create.mockClear()
    sut = new CreateProjectController(validatorStub, projectRepositorySpy)
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
    await sut.handle({ body: createProjectModelMock, currentUser: userModelMock })

    expect(projectRepositorySpy.create).toHaveBeenCalled()
    expect(projectRepositorySpy.create).toHaveBeenCalledWith({
      ...createProjectModelMock,
      createdBy: {
        firstName: userModelMock.firstName, surname: userModelMock.surname, email: userModelMock.email
      }
    })
  })

  it('should returns 201 with correct created project', async () => {
    const user = await sut.handle({ body: createProjectModelMock, currentUser: userModelMock })

    expect(user).toEqual({ statusCode: 201, body: projectModelMock })
  })
})
