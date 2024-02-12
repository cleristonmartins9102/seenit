import { type NextFunction, type RequestHandler, type Request, type Response } from 'express'
import { UnauthorizedError } from '../../application/errors'

export type InputAutorize = { headers: { authorization: string } }
export type AutorizeReturn = {
  id: number
  name: string
  permissions: string[]
}

export const permissionMiddeware = (allowed: string): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const permissions = req.locals.currentUser.permissions[0]
    for (const permission of allowed.split('')) {
      if (permissions.includes(permission)) {
        next()
        break
      } else {
        res.status(401).json(new UnauthorizedError())
      }
    }
  }
}
