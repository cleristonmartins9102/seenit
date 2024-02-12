export const projectSchema = {
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
    },
    createdBy: {
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
