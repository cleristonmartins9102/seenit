type Headers = {
  'x-access-token': string
}

export type HttpClientOptions = {
  headers: Headers
}
/**
 * Interface for Http type post request
 */
export interface HttpDeleteClient<R> {
  delete(url?: string, params?: any, header?: HttpClientOptions): Promise<R>
}
