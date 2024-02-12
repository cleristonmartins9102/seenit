import axios from 'axios'
import { type HttpClient, type HttpResponse } from '../../../src/application/contracts/http'

export const axiosAdapter: HttpClient = async (param) => {
  const response: HttpResponse = { statusCode: 200, body: null }
  try {
    const httpResponse = await axios({ method: param.method, headers: typeof param.headers !== 'undefined' ? param?.headers : {}, url: param.url, data: param.data })
    response.statusCode = httpResponse.status
    response.body = httpResponse.data
  } catch (error: any) {
    response.statusCode = error.response.status
    response.body = error.response.data
  }
  return response
}
