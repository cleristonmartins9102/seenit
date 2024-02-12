import { ProjectRepository } from '../../../infra/repository/project-repository'
import { CreateProjectController } from '../../../application/controller'
import { ValidatorComposite } from '../../../validators'
import { RequiredParameterValidator } from '../../../validators/required-parameter-validator'
import { CheckIfProjectExistsValidator } from '../../../validators/check-if-project-already-exists-validator'

export const createProjectControllerFactory = (): CreateProjectController => {
  const validators = [
    new RequiredParameterValidator('name'),
    new RequiredParameterValidator('description'),
    new CheckIfProjectExistsValidator(new ProjectRepository())
  ]
  const validator = new ValidatorComposite(validators)
  return new CreateProjectController(validator, new ProjectRepository())
}
