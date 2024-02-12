import { createProjectPath } from "./paths/project/create-project-path"
import { loadProjectsPath } from "./paths/project/load-project-path"
import { updateProjectPath } from "./paths/project/update-project-path"
import { deleteProjectPath } from "./paths/project/delete-project-path"
import { projectSchema } from "./schemas/project-schema"
import { signupPath } from "./paths/user/signup-path"
import { updateUserPath } from "./paths/user/update-user-path"
import { loadUsersPath } from "./paths/user/load-user-path"
import { deleteUserPath } from "./paths/user/delete-user-path"
import { userSchema } from "./schemas/user-schema"
export const swageerConfig =  {
  swagger: '3.0',
  openapi: '3.0.0',
  info: {
    title: 'Seenit Test',
    version: '0.0.1',
    // description: `### Through this HERE you will have access to the features available in our REST. Below we have a list of features available by security level.<br/>
    //  * Signup new user`
  },
  servers: [{
    url: 'http://127.0.0.1:5050/api',
  }],
  paths: {
    '/user/signup': signupPath,
    '/user/update': updateUserPath,
    '/user/load': loadUsersPath,
    '/user/delete': deleteUserPath,
    '/project/create': createProjectPath,
    '/project/load': loadProjectsPath,
    '/project/update': updateProjectPath,
    '/project/delete': deleteProjectPath
  },
  schemas: {
    projectSchema,
    userSchema
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
