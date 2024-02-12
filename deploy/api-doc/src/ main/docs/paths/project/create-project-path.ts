export const createProjectPath = {
  put: {
    tags: ['Project'],
    summary: 'API for create a new project',
    security: [
      {
        bearerAuth: []
      }
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: {
                type: 'string'
              },
              description: {
                type: 'string'
              }
            }
          }
        }
      }
    },
    responses: {
      201: {
        description: 'Created',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/projectSchema'
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
