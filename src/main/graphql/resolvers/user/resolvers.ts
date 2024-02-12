/* eslint-disable @typescript-eslint/no-explicit-any */
import { createUserControllerFactory, updateUserControllerFactory } from '../../../factory/controller'
import { type CreateUserModel } from '../../../../models'
import { type HttpRequest } from '../../../../application/helpers/http'
import { resolverAdapter } from '../../adapters/resolver-adapter'
import { loadUserControllerFactory } from '../../../factory/controller/load-user-controller-factory'
import { deleteUserControllerFactory } from '../../../factory/controller/delete-user-controller-factory'

export const createUser = {
  Query: {
    create: async (parent: any, args: HttpRequest<CreateUserModel>) => {
      const user = await resolverAdapter(createUserControllerFactory(), args)
      return user
    }
  }
}

export const loadUsersResolver = {
  Query: {
    load: async (parent: any, args: HttpRequest<CreateUserModel>) => await resolverAdapter(loadUserControllerFactory(), args)
  }
}

export const updateUsersResolver = {
  Query: {
    update: async (parent: any, args: HttpRequest<CreateUserModel>) => (!!await resolverAdapter(updateUserControllerFactory(), args))
  }
}

export const deleteUsersResolver = {
  Query: {
    delete: async (parent: any, args: HttpRequest<CreateUserModel>) => (!!await resolverAdapter(deleteUserControllerFactory(), args))
  }
}
