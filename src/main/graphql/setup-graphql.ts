/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApolloServer } from 'apollo-server-express'

import resolvers from './resolvers'
import typeDefs from './type-defs'
import { type InputAutorize, autorizeMiddeware } from '../../main/middlewares'
import { UnauthorizedError } from '../../application/errors'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setupGraphql = async (app: any): Promise<void> => {
  const server = new ApolloServer({
    resolvers,
    typeDefs,
    // context: ({ req, res }: { req: InputAutorize, res: any }) => {
    //   const authorizeResponse = autorizeMiddeware(req)
    //   if (authorizeResponse instanceof UnauthorizedError) {
    //     throw authorizeResponse
    //   }
    //   return authorizeResponse
    // },
    plugins: [{
      requestDidStart: (): any => ({
        willSendResponse: ({ response, errors }: any) => {
          if (errors !== undefined) {
            if (errors?.some((err: any) => err.message.includes('Required param'))) {
              response.data = undefined
              response.http.status = 400
            } else if (errors?.some((err: any) => err.name === 'UnauthorizedError')) {
              response.data = undefined
              response.http.status = 401
            }
          }
        }
      })
    }]
  })

  await server.start()
  server.applyMiddleware({ app })
}
