export const userSchema = {
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
    avatarUrl: {
      type: 'string'
    },
    createdAt: {
      type: 'string'
    },
    updatedAt: {
      type: 'string'
    }
  }
}
