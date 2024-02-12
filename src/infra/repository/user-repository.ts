import { type UpdateUser, type CreateUser, type LoadUsers, type DeleteUser } from '../../../src/services/contract/user/user-contracts'
import { type UserModel, type CreateUserModel, type UpdateUserModel } from '../../../src/models'
import { storage, userModelMock } from '../../../src/application/mocks/create-user-model-mock'
import { faker } from '@faker-js/faker'

export class UserRepository implements CreateUser, UpdateUser, LoadUsers, DeleteUser {
  create (saveUserModel: CreateUserModel): UserModel {
    const id = storage.users.reduce((accumulate, item) => {
      if (item.id && accumulate < item.id) {
        accumulate = item.id
      }
      return accumulate
    }, 0)
    const user = { id: id + 1, ...saveUserModel, createdAt: '2024-02-06 11:00', updatedAt: '2024-02-06 11:00' }
    storage.users.push(user)
    return user
  }

  update (updateUserModel: UpdateUserModel): UserModel | null | boolean {
    const id = typeof updateUserModel.id === 'string' ? parseInt(updateUserModel.id) : updateUserModel.id
    const userIdx = storage.users.findIndex(u => u.id === id)
    if (userIdx !== -1) {
      const user = storage.users[userIdx]
      const updatedUser = { ...user, ...updateUserModel }
      storage.users[userIdx] = { ...user, ...updateUserModel }
      return updatedUser
    }
    return false
  }

  load (): UserModel[] {
    return storage.users
  }

  delete (id: number): boolean {
    const handledId = typeof id === 'string' ? parseInt(id) : id
    const userIdx = storage.users.findIndex(u => u.id === handledId)
    if (userIdx !== -1) {
      storage.users.splice(userIdx, 1)
      return true
    }
    return false
  }
}
