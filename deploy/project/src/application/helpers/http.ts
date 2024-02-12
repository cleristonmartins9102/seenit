import { type UserModel } from '../../models/user-model'

export interface HttpRequest<BT = unknown | null> {
  body: BT
  currentUser?: UserModel
}

export interface HttpResponse<R = unknown | { error: string }> {
  statusCode: number
  body: R
}
