import { storage } from '../../application/mocks/models-mock'
import { type CreateProject, type DeleteProjects, type LoadProjects, type UpdateProjects } from '../../services/contract/project/project-contracts'
import { type UpdateProjectModel, type CreateProjectModel, type ProjectModel } from '../../models/project-model'

export class ProjectRepository implements CreateProject, UpdateProjects, LoadProjects, DeleteProjects {
  create (saveProjectModel: CreateProjectModel): ProjectModel {
    const id = storage.projects.reduce((accumulate, item) => {
      if (item.id && accumulate < item.id) {
        accumulate = item.id
      }
      return accumulate
    }, 0)
    const user = { id: id + 1, ...saveProjectModel, createdAt: '2024-02-06 11:00', updatedAt: '2024-02-06 11:00' }
    storage.projects.push(user)
    return user
  }

  update (updateProjectModel: UpdateProjectModel): ProjectModel | null | boolean {
    const id = typeof updateProjectModel.id === 'string' ? parseInt(updateProjectModel.id) : updateProjectModel.id
    const projectIdx = storage.projects.findIndex(u => u.id === id)
    if (projectIdx !== -1) {
      const project = storage.projects[projectIdx]
      const updatedProject = { ...project, ...updateProjectModel }
      storage.projects[projectIdx] = { ...project, ...updateProjectModel }
      return updatedProject
    }
    return false
  }

  load (): ProjectModel[] {
    return storage.projects
  }

  delete (id: number): boolean {
    const handledId = typeof id === 'string' ? parseInt(id) : id
    const projectIdx = storage.projects.findIndex(u => u.id === handledId)
    if (projectIdx !== -1) {
      storage.projects.splice(projectIdx, 1)
      return true
    }
    return false
  }
}
