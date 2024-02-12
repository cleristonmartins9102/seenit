import { type UpdateUserModel, type CreateUserModel, type UserModel } from '../../../models'

export interface CreateUser {
  create (saveUserModel: CreateUserModel): UserModel
}

export interface UpdateUser {
  update (saveUserModel: UpdateUserModel): UserModel | null | boolean
}

export interface LoadUsers {
  load (): UserModel[]
}
export interface DeleteUser {
  delete (id: number): boolean
}
