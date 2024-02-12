import { type Controller } from '../../contract'
import { type HttpRequest, type HttpResponse } from '../../helpers/http'
import { ok } from '../../helpers/http-returns'
import { type LoadProjects } from '../../../services/contract/project/project-contracts'

export class LoadProjectController implements Controller {
  constructor (private readonly loadProject: LoadProjects) {}
  async handle (param: HttpRequest<unknown>): Promise<HttpResponse<unknown>> {
    const projects = this.loadProject.load()
    return ok(projects)
  }
}
