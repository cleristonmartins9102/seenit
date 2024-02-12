import { type Controller } from '../../contract'
import { type HttpRequest, type HttpResponse } from '../../../application/helpers/http'
import { badRequest, created } from '../../../application/helpers/http-returns'
import { type Validation } from '../../../services/contract/validation'
import { type CreateProject } from '../../../services/contract/project/project-contracts'
import { type CreateProjectModel } from '../../../models/project-model'

export class CreateProjectController implements Controller {
  constructor (
    private readonly validator: Validation,
    private readonly createProject: CreateProject
  ) {}

  async handle (input: HttpRequest<CreateProjectModel>): Promise<HttpResponse<unknown>> {
    const { body, currentUser } = input
    const error = this.validator.validate(body)
    if (error) return badRequest(error)
    const project = this.createProject.create({ ...body, createdBy: { email: currentUser?.email, surname: currentUser?.surname, firstName: currentUser?.firstName } })
    return created(project)
  }
}
