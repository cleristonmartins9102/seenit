import { AxiosHttpClient } from '@/infra/http/axios-http-client'
import { HttpMethod } from '../protocol/http-client'
import { UnexpectedError } from '@/presentation/errors'
import { storageLoadAccountFactory } from '@/main/factories/usercases/load-storage-account-factory'
import { SaveProject } from '@/domain/projects/save-project'
import { ProjectModel } from '@/domain/projects/load'

export const remoteSaveProject: SaveProject = async (data): Promise<ProjectModel> => {
  const httpClient = new AxiosHttpClient()
  const account = storageLoadAccountFactory().load()
  const httpResponse = await httpClient.request({ headers: { Authorization: `Beare ${account.token}` }, method: HttpMethod.put, url: 'http://127.0.0.1:5050/api/project/create', data })
  switch (httpResponse.statusCode) {
    case 201:
    case 200:
      return httpResponse.body
    default:
      throw new UnexpectedError('')
  }
}
