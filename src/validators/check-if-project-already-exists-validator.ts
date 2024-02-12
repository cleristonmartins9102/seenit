import { type LoadProjects } from 'services/contract/project/project-contracts'
import { DuplicatedProjectError } from '../application/errors'
import { type Validation } from '../services/contract/validation'

export class CheckIfProjectExistsValidator implements Validation {
  constructor (private readonly projectRepository: LoadProjects) {}
  validate (input: { name: string }): Error | null {
    const projects = this.projectRepository.load()
    const project = projects.filter(project => project.name === input.name)
    if (project.length) return new DuplicatedProjectError(input.name)
    return null
  }
}
