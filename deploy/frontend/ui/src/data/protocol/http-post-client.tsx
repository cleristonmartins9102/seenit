
type Headers = {
  'x-access-token': string
  'content-type'?: string
}

export type HttpClientOptions = {
  headers: Headers
}
/**
 * Interface for Http type post request
 */
export interface HttpPostClient<R> {
  post(url?: string, params?: any, header?: HttpClientOptions): Promise<R>
}
