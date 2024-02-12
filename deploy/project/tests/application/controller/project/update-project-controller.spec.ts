import { type Controller } from '../../../../src/application/contract'
import mock, { type MockProxy } from 'jest-mock-extended/lib/Mock'
import { type Validation } from '../../../../src/services/contract/validation'
import { createProjectModelMock, createUserModelMock, projectModelMock } from '../../../../src/application/mocks/models-mock'
import { type UpdateProjects } from '../../../../src/services/contract/project/project-contracts'
import { UpdateProjectController } from '../../../../src/application/controller/projects/update-project-controller'

describe('update user controller', () => {
  let validatorStub: MockProxy<Validation>
  let projectRepositorySpy: MockProxy<UpdateProjects>
  let sut: Controller

  beforeAll(() => {
    projectRepositorySpy = mock()
    validatorStub = mock()
    validatorStub.validate.mockReturnValue(null)
    projectRepositorySpy.update.mockReturnValue(projectModelMock)
  })

  beforeEach(() => {
    sut = new UpdateProjectController(validatorStub, projectRepositorySpy)
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

    expect(projectRepositorySpy.update).toHaveBeenCalled()
  })

  it('should returns 200 with correct value', async () => {
    const user = await sut.handle({ body: createProjectModelMock })

    expect(user).toEqual({ statusCode: 200, body: projectModelMock })
  })
})
