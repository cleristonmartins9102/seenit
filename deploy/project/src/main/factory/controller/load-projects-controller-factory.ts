import { LoadProjectController } from '../../../application/controller/projects/load-project-controller'
import { ProjectRepository } from '../../../infra/repository/project-repository'

export const loadProjectsControllerFactory = (): LoadProjectController => {
  return new LoadProjectController(new ProjectRepository())
}
