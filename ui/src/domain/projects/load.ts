export type ProjectModel = {
  id: string
  name: string
  description: string
  createdBy: {
    firstName: string
  }
  createdAt: string
}
export type LoadProjects = () => Promise<ProjectModel[]>
