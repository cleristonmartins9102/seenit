import { HttpClient, HttpMethod } from '@/data/protocol/http-client'
import { HttpResponse } from '@/data/protocol/http-response-model'
import { GetUserAccountToken } from '@/domain/account/get-user-account-token'
import { env } from '@/main/config/env'
import { UnexpectedError } from '@/presentation/errors'

export class RemoteGetUserAccountToken implements GetUserAccountToken {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<HttpResponse<string>>
  ) {}

  async getToken (otp: string, idoffertask: string): Promise<string> {
    const httpResponse = await this.httpClient.request({ method: HttpMethod.post, url: this.url, data: { otp, idoffertask } })
    switch (httpResponse.statusCode) {
      case 200:
        return httpResponse.body
      default:
        throw new UnexpectedError(env.defaultErrorMessage)
    }
  }
}
