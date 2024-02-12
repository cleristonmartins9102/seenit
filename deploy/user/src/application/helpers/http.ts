import { type UserModel, type CreateUserModel } from '../../models'

export interface HttpRequest<BT = unknown | null> {
  body: BT
  currentUser?: UserModel
  locals?: any
}

export interface HttpResponse<R = unknown | { error: string }> {
  statusCode: number
  body: R
}
