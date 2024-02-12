import { type AppSecurity } from '../../src/main/middlewares/permission-middleware'
import { type FileDataModel } from './file-data-model'

export class CreateUserModel {
  firstName: string | undefined
  surname: string | undefined
  email: string | undefined
  token: string | undefined
  refresh_token: string | undefined
  password?: string | undefined
  permissions: AppSecurity[] = []
}

export type SignupUserModel = CreateUserModel & {
  avatar: FileDataModel
}

export type UpdateUserModel = {
  [Property in keyof CreateUserModel]?: CreateUserModel[Property]
} & { id: number }

export class UserModel extends CreateUserModel {
  id: number | undefined
  avatarUrl: string
  createdAt: string | undefined
  updatedAt: string | undefined
  constructor (data: UserModel.Data) {
    super()
    this.id = data.id
    this.firstName = data.firstName
    this.surname = data.surname
    this.email = data.email
    this.avatarUrl = data.avatarUrl
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
  }
}

export namespace UserModel {
  export type Data = {
    id: number
    firstName: string
    surname: string
    email: string
    avatarUrl: string
    createdAt: string
    updatedAt: string
  }
}
