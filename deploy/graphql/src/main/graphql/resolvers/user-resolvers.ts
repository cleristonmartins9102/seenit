import { resolverAdapter } from '../../../../src/infra/adapter/resolver-adapter'

export const usersResolver = {
  Query: {
    users: async (_: any, args: any, context: any): Promise<any> => await resolverAdapter(context.req, 'http://gateway-container:5050/api/user/load')
  }
}
