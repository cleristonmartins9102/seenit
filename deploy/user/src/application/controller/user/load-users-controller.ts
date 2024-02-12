import { type Controller } from '../../contract'
import { type HttpRequest, type HttpResponse } from '../../helpers/http'
import { ok } from '../../helpers/http-returns'
import { type LoadUsers } from '../../../domain/user-contracts'

export class LoadUsersController implements Controller {
  constructor (private readonly loadUsers: LoadUsers) {}
  async handle (param: HttpRequest<unknown>): Promise<HttpResponse<unknown>> {
    const users = this.loadUsers.load()
    return ok(users)
  }
}
