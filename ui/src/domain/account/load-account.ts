import { UserModel } from '../user/signup'

export interface LoadAccount<ParamType = any, ResponseType = UserModel> {
  load (param?: ParamType): ResponseType
}
