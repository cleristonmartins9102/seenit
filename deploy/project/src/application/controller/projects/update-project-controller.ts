import { type Controller } from '../../contract'
import { type HttpRequest, type HttpResponse } from '../../helpers/http'
import { badRequest, ok } from '../../helpers/http-returns'
import { type Validation } from '../../../services/contract/validation'
import { type UpdateProjects } from '../../../services/contract/project/project-contracts'
import { type UpdateProjectModel } from '../../../models/project-model'

export class UpdateProjectController implements Controller {
  constructor (
    private readonly validator: Validation,
    private readonly updateProject: UpdateProjects
  ) {}

  async handle (param: HttpRequest<UpdateProjectModel>): Promise<HttpResponse<unknown>> {
    const { body } = param
    const error = this.validator.validate(body)
    if (error) return badRequest(error)
    const response = this.updateProject.update(body)
    return ok(response)
  }
}
