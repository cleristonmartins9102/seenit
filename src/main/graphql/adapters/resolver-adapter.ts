/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApolloError } from 'apollo-server-express'
import { type Controller } from '../../../application/contract'
import { RequiredParameterError, UnauthorizedError } from '../../../application/errors'
import { type HttpRequest } from '../../../application/helpers/http'
import { type CreateUserModel } from '../../../models'

export const resolverAdapter = async <T>(controller: Controller, args: HttpRequest<T>): Promise<any> => {
  const controllerResponse: any = await controller.handle({ body: args })
  console.log(controllerResponse)
  switch (controllerResponse.statusCode) {
    case 200:
    case 201: return controllerResponse.body
    case 400: throw new RequiredParameterError(controllerResponse.body.error)
    case 401: throw new UnauthorizedError()
    default: throw new ApolloError(controllerResponse.body)
  }
}
