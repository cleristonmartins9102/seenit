export type CreateProjectModel = {
  name: string
  description: string
  createdBy: string
}

export interface ProjectModel extends CreateProjectModel {
  id: number
  createdAt: string
  updatedAt: string
}

export type UpdateProjectModel = {
  [Property in keyof CreateProjectModel]?: CreateProjectModel[Property]
} & {
  id: number
}
