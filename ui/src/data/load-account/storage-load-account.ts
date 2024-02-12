import { LoadAccount } from '@/domain/account/load-account'
import { GetStorage } from '@/domain/cache/load-storage'
import { UserModel } from '@/domain/user/signup'

export class StorageLoadAccount implements LoadAccount {
  constructor (
    private readonly localStorage: GetStorage
  ) {}

  load (): UserModel {
    // const sto = store
    // const reduxAccount = this.reduxAdapter.loadOne('account')
    // if (reduxAccount) return reduxAccount
    const account = this.localStorage.get('account')
    if (account) {
      return JSON.parse(account)
    }
    return null
  }
}
