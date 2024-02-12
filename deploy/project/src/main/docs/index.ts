import { projectSchema } from './schemas/project-schema'
import { createProjectPath } from './paths/project/create-project-path'
import { loadProjectsPath } from './paths/project/load-projects-path'
import { updateProjectPath } from './paths/project/update-project-path'
import { deleteProjectPath } from './paths/project/delete-project-path'

export default {
  swagger: '3.0',
  openapi: '3.0.0',
  info: {
    title: 'Seenit Test',
    version: '0.0.01'
  },
  servers: [{
    url: '/api'
  }],
  paths: {
    '/project/create': createProjectPath,
    '/project/load': loadProjectsPath,
    '/project/update': updateProjectPath,
    '/project/delete': deleteProjectPath
  },
  schemas: {
    projectSchema
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter the token with the `Bearer: ` prefix, e.g. "Bearer abcde12345".'
      }
    }
  }
}
