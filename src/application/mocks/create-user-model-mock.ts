import { type ProjectModel } from 'models/project-model'
import { type UserModel } from '../../models'

export const createProjectModelMock = { name: 'any_name', description: 'any_description' }
export const projectModelMock: ProjectModel = { id: 1, ...createProjectModelMock, description: 'any', createdBy: 'cleriston', createdAt: '2024-02-06 08:00', updatedAt: '2024-02-06 08:00' }

export const createUserModelMock = { firstName: 'any_name', surname: 'any_surname', email: 'john@gmail.com' }

export const userModelMock: UserModel = { id: 1, ...createUserModelMock, permissions: ['r'], avatarUrl: 'any_url', createdAt: '2024-02-06 08:00', updatedAt: '2024-02-06 08:00' }

export const storage: Storage = {
  users: [],
  projects: []
}

type Storage = {
  users: UserModel[]
  projects: ProjectModel[]
}
