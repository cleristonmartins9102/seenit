import { HttpMethod } from '../../../src/application/contracts/http'
import { axiosAdapter } from './'
import { UnauthorizedError, BadRequestError } from '@seenit-common/errors/build/errors'

export const resolverAdapter = async (req: any, url: string): Promise<any> => {
  const { headers } = req
  const resp = await axiosAdapter({ method: HttpMethod.get, headers: { authorization: headers.authorization }, url })
  switch (resp.statusCode) {
    case 200:
    case 201: return resp.body
    case 400: throw new BadRequestError(resp.body)
    case 401: throw new UnauthorizedError()
  }
}
