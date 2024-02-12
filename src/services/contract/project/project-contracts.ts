import { type UpdateProjectModel, type ProjectModel, type CreateProjectModel } from 'models/project-model'

export interface CreateProject {
  create (saveProjectModel: CreateProjectModel): ProjectModel
}

export interface LoadProjects {
  load (): ProjectModel[]
}

export interface UpdateProjects {
  update (projectData: UpdateProjectModel): ProjectModel | null | boolean
}

export interface DeleteProjects {
  delete (id: number): boolean
}
