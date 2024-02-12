import { createUserPath, updateUserPath } from './paths'
import { deleteUserPath } from './paths/user/delete-user-path'
import { loadUsersPath } from './paths/user/load-user-path'
import { userSchema } from './schemas/user-schema'
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
    '/user/create': createUserPath,
    '/user/update': updateUserPath,
    '/user/load': loadUsersPath,
    '/user/delete': deleteUserPath,
    '/project/create': createProjectPath,
    '/project/load': loadProjectsPath,
    '/project/update': updateProjectPath,
    '/project/delete': deleteProjectPath
  },
  schemas: {
    userSchema,
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
