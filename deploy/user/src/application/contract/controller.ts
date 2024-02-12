import { type HttpRequest, type HttpResponse } from 'application/helpers/http'

export interface Controller {
  handle (param: HttpRequest): Promise<HttpResponse>
}
