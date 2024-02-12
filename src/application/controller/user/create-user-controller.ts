import { type Controller } from '../../contract'
import { type HttpRequest, type HttpResponse } from '../../helpers/http'
import { badRequest, created } from '../../helpers/http-returns'
import { type CreateUserModel } from '../../../models'
import { type CreateUser } from '../../../services/contract/user/user-contracts'
import { type Validation } from '../../../services/contract/validation'

export class CreateUserController implements Controller {
  constructor (
    private readonly validator: Validation,
    private readonly createUser: CreateUser
  ) {}

  async handle (input: HttpRequest<CreateUserModel>): Promise<HttpResponse<unknown>> {
    const { body } = input
    const error = this.validator.validate(body)
    if (error) return badRequest(error)
    const user = this.createUser.create(body)
    return created(user)
  }
}
