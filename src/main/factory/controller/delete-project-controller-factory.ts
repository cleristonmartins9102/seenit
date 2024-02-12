import { ProjectRepository } from '../../../infra/repository/project-repository'
import { DeleteProjectController } from '../../../application/controller/projects/delete-project-controller'
import { ValidatorComposite } from '../../../validators'
import { RequiredParameterValidator } from '../../../validators/required-parameter-validator'

export const deleteProjectControllerFactory = (): DeleteProjectController => {
  const validators = [
    new RequiredParameterValidator('id')
  ]
  const validator = new ValidatorComposite(validators)
  return new DeleteProjectController(validator, new ProjectRepository())
}
