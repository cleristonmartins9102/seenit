import { type AppSecurity } from 'main/middlewares/permission-middleware'

export interface Encrypter {
  encrypt (data: Encrypter.DataType): Promise<string>
}

export namespace Encrypter {
  export type DataType = {
    id: number
    firstName: string
    surname: string
    email: string
    permissions: AppSecurity[]
  }
}
