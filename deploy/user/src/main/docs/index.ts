import { signupPath, updateUserPath } from './paths'
import { deleteUserPath } from './paths/user/delete-user-path'
import { loadUsersPath } from './paths/user/load-user-path'
import { userSchema } from './schemas/user-schema'

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
    '/user/signup': signupPath,
    '/user/update': updateUserPath,
    '/user/load': loadUsersPath,
    '/user/delete': deleteUserPath
  },
  schemas: {
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
