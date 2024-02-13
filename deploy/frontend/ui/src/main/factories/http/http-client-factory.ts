import { AxiosHttpClient } from '@/infra/http/axios-http-client'
import { env } from '@/main/config/env'

export const httpClientFactor = (path: string): AxiosHttpClient => {
  const httpGetClient = new AxiosHttpClient()
  return httpGetClient
}
