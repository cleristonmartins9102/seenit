
import { StorageLoadAccount } from '@/data/load-account/storage-load-account'
import { LoadAccount } from '@/domain/account/load-account'
import { LocalStorageAdapter } from '@/infra/cache/local-storage/local-storage-adapter'

export const storageLoadAccountFactory = (): LoadAccount => {
  const storageLoadAccount = new StorageLoadAccount(new LocalStorageAdapter())
  return storageLoadAccount
}
