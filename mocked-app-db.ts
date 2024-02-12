/**
 * This simulate the general App controll, in order to identify app, module and submodules.
 */
export const mockedAppDb = [
  {
    app: {
      name: 'user',
      id: '1',
      module: [
        {
          name: 'load',
          id: '1',
        },
        {
          name: 'update',
          id: '2',
        },
        {
          name: 'delete',
          id: '3',
        }
      ]
    }
  },
  {
    app: {
      name: 'project',
      id: '2',
      module: [
        {
          name: 'create',
          id: '1',
        },
        {
          name: 'load',
          id: '2',
        },
        {
          name: 'update',
          id: '3',
        },
        {
          name: 'delete',
          id: '4',
        }
      ]
    }
  }
]