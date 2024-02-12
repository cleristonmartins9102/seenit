import { resolverAdapter } from '../../../infra/adapter/resolver-adapter'

export const projectsResolver = {
  Query: {
    projects: async (_: any, args: any, context: any): Promise<any> => await resolverAdapter(context.req, 'http://gateway-container:5050/api/project/load')
  }
}
