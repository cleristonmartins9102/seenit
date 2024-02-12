export class CreateUserModel {
  firstName: string | undefined
  surname: string | undefined
  email: string | undefined
  avatarUrl: string | undefined
  permissions: string[] = []
}

export type UpdateUserModel = {
  [Property in keyof CreateUserModel]?: CreateUserModel[Property]
} & { id: number }

export class UserModel extends CreateUserModel {
  id: number | undefined
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
