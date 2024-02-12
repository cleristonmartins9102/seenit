export const updateProjectPath = {
  post: {
    tags: ['Project'],
    summary: 'API for update a project',
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
              id: {
                type: 'number'
              },
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
