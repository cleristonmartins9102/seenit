
import { SaveAccount } from '@/domain/account/save-account'
import { SetStorage } from '@/domain/cache/set-storage'
import { UserModel } from '@/domain/user/signup'
export class StorageSaveAccount implements SaveAccount {
  constructor (private readonly localStorage: SetStorage) {}

  async save (accountModel: UserModel): Promise<void> {
    this.localStorage.set('account', accountModel)
    return null
  }
}
