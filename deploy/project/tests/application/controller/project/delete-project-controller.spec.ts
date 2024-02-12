import { type Controller } from '../../../../src/application/contract'
import mock, { type MockProxy } from 'jest-mock-extended/lib/Mock'
import { type Validation } from '../../../../src/services/contract/validation'
import { type DeleteProjects } from '../../../../src/services/contract/project/project-contracts'
import { DeleteProjectController } from '../../../../src/application/controller/projects/delete-project-controller'

describe('delete project controller', () => {
  let validatorStub: MockProxy<Validation>
  let projectRepositorySpy: MockProxy<DeleteProjects>
  let sut: Controller

  beforeAll(() => {
    projectRepositorySpy = mock()
    validatorStub = mock()
    validatorStub.validate.mockReturnValue(null)
    projectRepositorySpy.delete.mockReturnValue(true)
  })

  beforeEach(() => {
    sut = new DeleteProjectController(validatorStub, projectRepositorySpy)
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

    expect(projectRepositorySpy.delete).toHaveBeenCalled()
    expect(projectRepositorySpy.delete).toHaveBeenCalledWith(1)
  })

  it('should returns 200 with correct response', async () => {
    const user = await sut.handle({ body: { id: 1 } })

    expect(user).toEqual({ statusCode: 200, body: true })
  })
})
