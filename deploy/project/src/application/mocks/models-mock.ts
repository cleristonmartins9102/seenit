import { type ProjectModel } from '../../models/project-model'
import { type UserModel } from '../../models/user-model'

export const createUserModelMock = { firstName: 'any_name', surname: 'any_surname', email: 'mark@gmail.com', password: 'any_password', permissions: ['CRUD'] }

export const userModelMock: UserModel = { id: 1, ...createUserModelMock }
export const createProjectModelMock = { name: 'any_name', description: 'any_description' }
export const projectModelMock: ProjectModel = { id: 1, ...createProjectModelMock, description: 'any', createdBy: { surname: 'any', firstName: 'any', email: 'any' }, createdAt: '2024-02-06 08:00', updatedAt: '2024-02-06 08:00' }

export const storage: Storage = {
  projects: []
}

type Storage = {
  projects: ProjectModel[]
}
