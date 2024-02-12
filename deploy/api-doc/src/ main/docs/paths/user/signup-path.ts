export const signupPath = {
  put: {
    tags: ['User'],
    summary: 'API for signup',

    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              firstName: {
                type: 'string'
              },
              surname: {
                type: 'string'
              },
              email: {
                type: 'string'
              },
              password: {
                type: 'string'
              },
              avatar: {
                type: 'object',
                properties: {
                  fileName: {
                    type: 'string'
                  },
                  extension: {
                    type: 'string'
                  },
                  base64: {
                    type: 'string'
                  }
                }
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
