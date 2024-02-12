import { StorageSaveAccount } from '@/data/account/save-account/storage-save-account'
import { SaveAccount } from '@/domain/account/save-account'
import { LocalStorageAdapter } from '@/infra/cache/local-storage/local-storage-adapter'

export const storageSaveAccountFactory = (): SaveAccount => {
  const localStorageAdapter = new LocalStorageAdapter()
  const storageSaveAccount = new StorageSaveAccount(localStorageAdapter)
  return storageSaveAccount
}
