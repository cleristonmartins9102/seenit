/**
 * Interface for Http type get request
 */
export interface HttpGetClient<P, R> {
  get(url?: string, param?: P): Promise<R>
}
