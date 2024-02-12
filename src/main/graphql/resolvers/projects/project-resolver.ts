import { type CreateProjectModel } from 'models/project-model'
import { type HttpRequest } from '../../../../application/helpers/http'
import { createProjectControllerFactory } from '../../../../main/factory/controller/create-project-controller-factory'
import { resolverAdapter } from '../../../../main/graphql/adapters/resolver-adapter'
import { loadProjectsControllerFactory } from '../../../../main/factory/controller/load-projects-controller-factory'
import { updateProjectControllerFactory } from '../../../../main/factory/controller/update-project-controller-factory'
import { deleteProjectControllerFactory } from '../../../../main/factory/controller/delete-project-controller-factory'

/* eslint-disable @typescript-eslint/no-explicit-any */

export const createProject = {
  Query: {
    createProject: async (parent: any, args: HttpRequest<CreateProjectModel>) => {
      const project = await resolverAdapter<CreateProjectModel>(createProjectControllerFactory(), args)
      return project
    }
  }
}

export const loadProjectsResolver = {
  Query: {
    loadProjects: async (parent: any, args: HttpRequest<CreateProjectModel>) => await resolverAdapter(loadProjectsControllerFactory(), args)
  }
}

export const updateProjectsResolver = {
  Query: {
    updateProject: async (parent: any, args: HttpRequest<CreateProjectModel>) => !!await resolverAdapter(updateProjectControllerFactory(), args)
  }
}

export const deleteProjectResolver = {
  Query: {
    deleteProject: async (parent: any, args: HttpRequest<CreateProjectModel>) => (!!await resolverAdapter(deleteProjectControllerFactory(), args))
  }
}
