import { HttpResponse } from '@/data/protocol/http-response-model'

export type UserModel = {
  id: string
  firstName: string
  surname: string
  email: string
  token?: string
  password: string
  permissions?: AppSecurity[]
  avatar: {
    fileName: string
    extension: string
    base64: string
  },
  createdAt?: string
}

export type AppSecurity = {
  app: {
    name: string
    id: string
    module: Array<{
      id: string
      name: string
      accepted: Permissions
    }>
  }

}

export enum Permissions {
  create = 'C',
  read = 'R',
  update = 'U',
  delete = 'D'
}

export type Signup = (userModel: UserModel) => Promise<HttpResponse<any>>
