import { GetStorage } from '@/domain/cache/load-storage'
import { RemoveStorage } from '@/domain/cache/remove-storage'
import { SetStorage } from '@/domain/cache/set-storage'
import { UserModel } from '@/domain/user/signup'

export class LocalStorageAdapter implements SetStorage, GetStorage, RemoveStorage {
  set (key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value))
    return null
  }

  get <ResponseType=any> (key: string): ResponseType {
    return localStorage.getItem(key) as any
  }

  removeItem (key: string): void {
    return localStorage.removeItem(key) as any
  }

  update (account: UserModel): void {
    this.removeItem('account')
    this.set('account', account)
  }
}
