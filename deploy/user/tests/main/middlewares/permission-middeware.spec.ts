import { getMockReq, getMockRes } from '@jest-mock/express'
import { type AppSecurity, Permissions, permissionMiddeware } from '../../../src/main/middlewares/permission-middleware'
import { UnauthorizedError } from '../../../src/application/errors'
import { type NextFunction, type Request, type Response } from 'express'

describe('permission middleware', () => {
  const appSecurity: AppSecurity = {
    app: {
      name: 'user',
      id: '1',
      module: [{
        name: 'update',
        id: '1',
        accepted: Permissions.update
      }]
    }
  }
  let req: Request
  let res: Response
  let next: NextFunction

  beforeEach(() => {
    req = getMockReq({ locals: { currentUser: { permissions: [appSecurity] } } })
    res = getMockRes().res
    next = getMockRes().next
  })

  it('should call returns UnauthorizedError if user not has app permission', async () => {
    const sut = permissionMiddeware({
      app: {
        name: 'user',
        id: '3',
        module: [{
          name: 'update',
          id: '1',
          accepted: Permissions.update
        }]
      }
    })

    sut(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith(new UnauthorizedError())
  })

  it('should call returns UnauthorizedError if user has app permission but not has module permission', async () => {
    const sut = permissionMiddeware({
      app: {
        name: 'user',
        id: '1',
        module: [{
          name: 'update',
          id: '8',
          accepted: Permissions.update
        }]
      }
    })

    sut(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith(new UnauthorizedError())
  })

  it('should call returns UnauthorizedError if user has app permission but not has module permission, but not has level permission', async () => {
    const sut = permissionMiddeware({
      app: {
        name: 'user',
        id: '1',
        module: [{
          name: 'update',
          id: '1',
          accepted: Permissions.delete
        }]
      }
    })

    sut(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith(new UnauthorizedError())
  })

  it('should call next if user has access', async () => {
    const sut = permissionMiddeware({
      app: {
        name: 'user',
        id: '1',
        module: [{
          name: 'update',
          id: '1',
          accepted: Permissions.update
        }]
      }
    })

    sut(req, res, next)

    expect(next).toHaveBeenCalled()
  })
})
