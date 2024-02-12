import { type Controller } from '../../contract'
import { type HttpRequest, type HttpResponse } from '../../helpers/http'
import { badRequest, ok } from '../../helpers/http-returns'
import { type UpdateUserModel } from '../../../models'
import { type Validation } from '../../../services/contract/validation'
import { type UpdateProjects } from '../../../services/contract/project/project-contracts'

export class UpdateProjectController implements Controller {
  constructor (
    private readonly validator: Validation,
    private readonly updateProject: UpdateProjects
  ) {}

  async handle (param: HttpRequest<UpdateUserModel>): Promise<HttpResponse<unknown>> {
    const { body } = param
    const error = this.validator.validate(body)
    if (error) return badRequest(error)
    const response = this.updateProject.update(body)
    return ok(response)
  }
}
