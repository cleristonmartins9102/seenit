import { UserModel } from '../user/signup'

export interface SaveAccount {
  save(accountModel: UserModel): Promise<void>
}
