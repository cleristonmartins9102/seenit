import { type Controller } from '../../contract'
import { type HttpRequest, type HttpResponse } from '../../helpers/http'
import { badRequest, ok } from '../../helpers/http-returns'
import { type Validation } from '../../../services/contract/validation'
import { type DeleteProjects } from '../../../services/contract/project/project-contracts'

type HttpRequestBody = {
  id: number
}

export class DeleteProjectController implements Controller {
  constructor (
    private readonly validator: Validation,
    private readonly deleteProject: DeleteProjects
  ) {}

  async handle (param: HttpRequest<HttpRequestBody>): Promise<HttpResponse<unknown>> {
    const { body } = param
    const error = this.validator.validate(body)
    if (error) return badRequest(error)
    const deleteResponse = this.deleteProject.delete(body.id)
    return ok(deleteResponse)
  }
}
