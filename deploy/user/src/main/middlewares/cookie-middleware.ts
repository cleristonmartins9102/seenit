import cookieSession from 'cookie-session'
import { type Request, type Response, type NextFunction, type RequestHandler } from 'express'
import { type CookieAdapter } from '../../infra/adapters/cookie-adapter'

export const cookieMiddleware = (cookieAdapter: CookieAdapter.Build): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const fakeNext = (): void => {}
    cookieSession({ secure: false, signed: false })(req, res, fakeNext)
    if (cookieAdapter.build) {
      req.locals = { ...req.locals, cookieConfig: cookieAdapter.build(req.session, req.sessionOptions) }
    }
    next()
  }
}
