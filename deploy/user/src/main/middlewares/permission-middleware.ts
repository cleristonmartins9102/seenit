import { UnauthorizedError } from '../../application/errors'
import { type NextFunction, type RequestHandler, type Request, type Response } from 'express'

export type InputAutorize = { headers: { authorization: string } }
export type AppSecurity = {
  app: {
    name: string
    id: string
    module: Array<{
      id: string
      name: string
      accepted: Permissions
    }>
  }

}
export enum Permissions {
  create = 'C',
  read = 'R',
  update = 'U',
  delete = 'D'
}

export type AutorizeReturn = {
  id: number
  name: string
  permissions: Permissions[]
}

/**
 * Function for check if the user has permisson on each app and their modules
 * @param appSecurity
 * @returns RequestHandler
 */
export const permissionMiddeware = (appSecurity: AppSecurity): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const appId = appSecurity.app.id
    const moduleId = appSecurity.app.module[0].id
    const accepted = appSecurity.app.module[0].accepted
    const userPermissions = req.locals.currentUser.permissions as AppSecurity[]
    let hasAppPermission = false
    let hasModulePermission = false
    for (const currentApp of userPermissions) {
      if (currentApp?.app?.id === appId) {
        hasAppPermission = true
        for (const currentModule of currentApp.app.module) {
          if (currentModule.id === moduleId && currentModule.accepted === accepted) {
            hasModulePermission = true
          }
        }
      }
    }
    if (!hasAppPermission || !hasModulePermission) {
      res.status(401).json(new UnauthorizedError())
    } else {
      next()
    }
  }
}
