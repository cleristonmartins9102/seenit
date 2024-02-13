import { Signup } from '@/domain/user/signup'
import { HttpResponse } from '../protocol/http-response-model'
import { AxiosHttpClient } from '@/infra/http/axios-http-client'
import { HttpMethod } from '../protocol/http-client'
import { UnexpectedError } from '@/presentation/errors'
import { LoadProjects } from '@/domain/projects/load'
import { storageLoadAccountFactory } from '@/main/factories/usercases/load-storage-account-factory'

export const remoteLoadProjects: LoadProjects = async (): Promise<any> => {
  const httpClient = new AxiosHttpClient()
  const account = storageLoadAccountFactory().load()
  const httpResponse = await httpClient.request({ headers: { Authorization: `Beare ${account.token}` }, method: HttpMethod.get, url: 'http://127.0.0.1:5050/api/project/load', data: '' })
  switch (httpResponse.statusCode) {
    case 201:
    case 200:
      return httpResponse.body
    default:
      throw new UnexpectedError('')
  }
}
