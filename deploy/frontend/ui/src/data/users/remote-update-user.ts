import { AxiosHttpClient } from '@/infra/http/axios-http-client'
import { HttpMethod } from '../protocol/http-client'
import { UnexpectedError } from '@/presentation/errors'
import { storageLoadAccountFactory } from '@/main/factories/usercases/load-storage-account-factory'
import { UpdateUser } from '@/domain/user/save-user'

export const remoteUpdateUser: UpdateUser = async (data) => {
  const httpClient = new AxiosHttpClient()
  const account = storageLoadAccountFactory().load()
  const httpResponse = await httpClient.request({ headers: { Authorization: `Beare ${account.token}` }, method: HttpMethod.post, url: 'http://127.0.0.1:5050/api/user/update', data })
  switch (httpResponse.statusCode) {
    case 201:
    case 200:
      return httpResponse.body
    default:
      throw new UnexpectedError('')
  }
}
