import { PostParamModel } from '@/data/model/post-param-model'
import { HttpClient, HttpMethod, HttpParams } from '@/data/protocol/http-client'
import { HttpClientOptions, HttpDeleteClient } from '@/data/protocol/http-delete-client'
import { HttpGetClient } from '@/data/protocol/http-get-client'
import { HttpPostClient } from '@/data/protocol/http-post-client'
import axios from 'axios'

export type AxiosReponse = {
  error?: string
  status: string
  data?: any
}
export class AxiosHttpClient implements HttpClient<any> {
  async request (param: HttpParams): Promise<any> {
    let axiosResponse: any
    const options = {
      headers: param.headers
    }
    try {
      axiosResponse = await axios({ method: param.method, headers: param.headers, url: param.url, data: param.data })
    } catch (error) {
      console.log('ERROR', error)
      axiosResponse = error.response
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    } as any
  }
}
