import { type Controller } from '../../application/contract'
import { type RequestHandler, type Request, type Response, type NextFunction } from 'express'

export const expressAdapter = (controller: Controller): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { body, locals } = req
    const controllerResponse = await controller.handle({ body, currentUser: locals?.currentUser })
    res.status(controllerResponse.statusCode).json(controllerResponse.body)
  }
}
