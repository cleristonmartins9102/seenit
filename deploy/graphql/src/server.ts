import { ApolloServer } from 'apollo-server-express'
import { type GraphQLError } from 'graphql'
import { typeDefs } from './main/graphql/defs'
import { resolvers } from './main/graphql/resolvers'
import express from 'express'

const handleErrors = (response: any, errors: any[]): void => {
  if (typeof errors !== 'undefined') {
    errors.forEach((error: GraphQLError) => {
      if (checkError(error, 'UnauthorizedError')) {
        response.http.status = 401
        response.data = undefined
      } else if (checkError(error, 'BadRequestError')) {
        response.http.status = 400
        response.data = undefined
      }
    })
  }
}

const checkError = (error: GraphQLError, errorName: string): boolean => [error.name, error?.originalError?.name].some(name => name === errorName)

const startApolloServer = async (): Promise<void> => {
  const app: any = express()

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
    plugins: [
      {
        requestDidStart: () => ({
          willSendResponse: ({ response, errors }: { response: any, errors: [] }) => { handleErrors(response, errors) }
        }) as any
      }
    ]
  })
  await server.start()

  server.applyMiddleware({ app })

  app.listen(5051, () => { console.log('Running on 5051') })
}

startApolloServer().then(r => { console.log(r) }).catch(err => { console.log(err) })
