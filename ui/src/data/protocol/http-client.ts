export enum HttpMethod {
  post = 'post',
  get = 'get',
  put = 'PUT'
}
export interface HttpParams<dataType=any> {
  url: string
  method: HttpMethod
  headers?: {
    Authorization?: string
    Accept?: string
    ['Access-Control-Allow-Origin']?: string
  }
  data?: any
}
export interface HttpClient<responseType> {
  request (params: HttpParams): Promise<responseType>
}
