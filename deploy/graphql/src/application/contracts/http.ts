export interface HttpClientParams {
  method: HttpMethod
  url: string
  headers?: Header
  data?: any
}

export type Header = {
  authorization?: string
}

export enum HttpMethod {
  post = 'POST',
  put = 'PUT',
  get = 'GET',
  delete = 'DELETE'
}

export type HttpResponse = {
  statusCode: number
  body: any
}

export type HttpClient = (param: HttpClientParams) => Promise<HttpResponse>
