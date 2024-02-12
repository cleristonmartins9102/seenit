import { type Controller } from '../../contract'
import { type HttpRequest, type HttpResponse } from '../../helpers/http'
import { badRequest, ok } from '../../helpers/http-returns'
import { type UpdateUserModel } from '../../../models'
import { type UpdateUser } from '../../../services/contract/user/user-contracts'
import { type Validation } from '../../../services/contract/validation'

export class UpdateUserController implements Controller {
  constructor (
    private readonly validator: Validation,
    private readonly updateUser: UpdateUser
  ) {}

  async handle (param: HttpRequest<UpdateUserModel>): Promise<HttpResponse<unknown>> {
    const { body } = param
    const error = this.validator.validate(body)
    if (error) return badRequest(error)
    const response = this.updateUser.update(body)
    return ok(response)
  }
}
