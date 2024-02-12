import { userSchema } from '../../schemas/user-schema'

export const updateUserPath = {
  post: {
    tags: ['User'],
    security: [
      {
        bearerAuth: []
      }
    ],
    summary: 'API for update an user',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: {
                type: 'number'
              },
              firstName: {
                type: 'string'
              },
              surname: {
                type: 'string'
              },
              email: {
                type: 'string'
              },
              picture: {
                type: 'file'
              }
            }
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/userSchema'
            }
          }
        }
      },
      401: {
        description: 'Fail',
        content: {
          'application/json': {
            schema: {
              properties: {
                error: {
                  type: 'string'
                }
              }
            }
          }
        }
      },
      500: {
        description: 'Server Error',
        content: {
          'application/json': {
            schema: {
              properties: {
                error: {
                  type: 'string'
                }
              }
            }
          }
        }
      }
    }
  }
}
