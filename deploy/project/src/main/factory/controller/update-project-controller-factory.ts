import { UpdateProjectController } from '../../../application/controller/projects/update-project-controller'
import { ValidatorComposite } from '../../../validators'
import { RequiredParameterValidator } from '../../../validators/required-parameter-validator'
import { ProjectRepository } from '../../../infra/repository/project-repository'

export const updateProjectControllerFactory = (): UpdateProjectController => {
  const validators = [
    new RequiredParameterValidator('id')
  ]
  const validator = new ValidatorComposite(validators)
  return new UpdateProjectController(validator, new ProjectRepository())
}
