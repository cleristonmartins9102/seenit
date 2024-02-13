import { Signup } from '@/domain/user/signup'
import { HttpResponse } from '../protocol/http-response-model'
import { AxiosHttpClient } from '@/infra/http/axios-http-client'
import { HttpMethod } from '../protocol/http-client'
import { UnexpectedError } from '@/presentation/errors'

export const remoteSignup: Signup = async (params): Promise<HttpResponse<any>> => {
  const httpClient = new AxiosHttpClient()
  const httpResponse = await httpClient.request({ method: HttpMethod.put, url: 'http://127.0.0.1:5050/api/user/signup', data: params })
  switch (httpResponse.statusCode) {
    case 201:
    case 200:
      return httpResponse.body
    default:
      throw new UnexpectedError('')
  }
}
