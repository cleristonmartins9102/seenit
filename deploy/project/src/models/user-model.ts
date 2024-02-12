export class CreateUserModel {
  firstName: string | undefined
  surname: string | undefined
  email: string | undefined
}

export type UpdateUserModel = {
  [Property in keyof CreateUserModel]?: CreateUserModel[Property]
} & { id?: number }

export class UserModel extends CreateUserModel {
  id?: number | undefined
  constructor (data: UserModel.Data) {
    super()
    this.id = data.id
    this.firstName = data.firstName
    this.surname = data.surname
    this.email = data.email
  }
}

export namespace UserModel {
  export type Data = {
    id?: number
    firstName: string
    surname: string
    email: string
  }
}
