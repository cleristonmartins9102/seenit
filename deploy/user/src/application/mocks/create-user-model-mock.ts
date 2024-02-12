import { type AppSecurity, Permissions } from '../../main/middlewares/permission-middleware'
import { type UserModel } from '../../models'
const defaultPermissions: AppSecurity[] = [
  {
    app: {
      name: 'user',
      id: '1',
      module: [
        {
          name: 'load',
          id: '1',
          accepted: Permissions.read
        },
        {
          name: 'update',
          id: '2',
          accepted: Permissions.update
        },
        {
          name: 'delete',
          id: '3',
          accepted: Permissions.delete
        }
      ]
    }
  },
  {
    app: {
      name: 'project',
      id: '2',
      module: [
        {
          name: 'create',
          id: '1',
          accepted: Permissions.create
        },
        {
          name: 'load',
          id: '2',
          accepted: Permissions.read
        },
        {
          name: 'update',
          id: '3',
          accepted: Permissions.update
        },
        {
          name: 'delete',
          id: '4',
          accepted: Permissions.delete
        }
      ]
    }
  }

]
export const createUserModelMock = { firstName: 'any_name', avatar: { fileName: 'any_file_name', extension: 'jpg', base64: 'any_base64' }, surname: 'any_surname', email: 'mark@gmail.com', password: 'any_password' }

export const userModelMock: UserModel = { id: 1, ...createUserModelMock, permissions: defaultPermissions, avatarUrl: 'any_url', token: 'token', refresh_token: 'refresh_token', createdAt: '2024-02-06 08:00', updatedAt: '2024-02-06 08:00' }

export const storage: Storage = {
  users: []
}

type Storage = {
  users: UserModel[]
}
