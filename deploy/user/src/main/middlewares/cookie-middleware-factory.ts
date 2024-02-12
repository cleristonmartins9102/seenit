import { type RequestHandler } from 'express'
import { CookieAdapter } from '../../infra/adapters/cookie-adapter'
import { cookieMiddleware } from './cookie-middleware'

export const cookieMiddlewareFactory = (): RequestHandler => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
  return cookieMiddleware(CookieAdapter as any)
}
