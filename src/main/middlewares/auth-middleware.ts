import { type NextFunction, type Response, type Request } from 'express'
import { type InputAutorize, autorizeMiddeware } from './autorize-middleware'
import { UnauthorizedError } from '../../application/errors'

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const autorization = autorizeMiddeware(req as InputAutorize)
  if (autorization instanceof UnauthorizedError) {
    res.status(401).json({ error: autorization })
  } else {
    req.locals = { ...req.locals, currentUser: autorization }
    next()
  }
}
