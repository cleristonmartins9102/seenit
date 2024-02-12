import { type MockProxy, mock } from 'jest-mock-extended'
import { DuplicatedProjectError } from '../../src/application/errors'
import { projectModelMock } from '../../src/application/mocks/models-mock'
import { type LoadProjects } from '../../src/services/contract/project/project-contracts'
import { CheckIfProjectExistsValidator } from '../../src/validators/check-if-project-already-exists-validator'

describe('check if project exists validator', () => {
  let projectRepositorySpy: MockProxy<LoadProjects>

  beforeAll(() => {
    projectRepositorySpy = mock()
    projectRepositorySpy.load.mockReturnValue([projectModelMock])
  })

  it('should call ProjectRepository Load once', () => {
    const sut = new CheckIfProjectExistsValidator(projectRepositorySpy)

    sut.validate({ name: 'project_name' })

    expect(projectRepositorySpy.load).toHaveBeenCalled()
  })

  it('should returns an error if fails', () => {
    const sut = new CheckIfProjectExistsValidator(projectRepositorySpy)

    const error = sut.validate({ name: projectModelMock.name })

    expect(error).toEqual(new DuplicatedProjectError(projectModelMock.name))
  })

  it('should returns null on success', () => {
    projectRepositorySpy.load.mockReturnValueOnce([])
    const sut = new CheckIfProjectExistsValidator(projectRepositorySpy)

    const error = sut.validate({ name: projectModelMock.name })

    expect(error).toBeNull()
  })
})
