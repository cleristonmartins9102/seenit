import { type Controller } from '../../../../src/application/contract'
import mock, { type MockProxy } from 'jest-mock-extended/lib/Mock'
import { projectModelMock } from '../../../../src/application/mocks/models-mock'
import { type LoadProjects } from '../../../../src/services/contract/project/project-contracts'
import { LoadProjectController } from '../../../../src/application/controller/projects/load-project-controller'

describe('load projects controller', () => {
  let projectRepositorySpy: MockProxy<LoadProjects>
  let sut: Controller

  beforeAll(() => {
    projectRepositorySpy = mock()
    projectRepositorySpy.load.mockReturnValue([projectModelMock])
  })

  beforeEach(() => {
    sut = new LoadProjectController(projectRepositorySpy)
  })

  it('should call create user with correct value', async () => {
    await sut.handle({ body: '' })

    expect(projectRepositorySpy.load).toHaveBeenCalled()
  })

  it('should returns 200 with correct projects', async () => {
    const user = await sut.handle({ body: '' })

    expect(user).toEqual({ statusCode: 200, body: [projectModelMock] })
  })
})
