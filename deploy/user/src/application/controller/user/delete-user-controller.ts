import { type Controller } from '../../contract'
import { type HttpRequest, type HttpResponse } from '../../helpers/http'
import { badRequest, ok } from '../../helpers/http-returns'
import { type DeleteUser } from '../../../domain/user-contracts'
import { type Validation } from '../../../domain/validation'

type HttpRequestBody = {
  id: number
}

export class DeleteUserController implements Controller {
  constructor (
    private readonly validator: Validation,
    private readonly deleteUser: DeleteUser
  ) {}

  async handle (param: HttpRequest<HttpRequestBody>): Promise<HttpResponse<unknown>> {
    const { body } = param
    const error = this.validator.validate(body)
    if (error) return badRequest(error)
    const deleteResponse = this.deleteUser.delete(body.id)
    return ok(deleteResponse)
  }
}
