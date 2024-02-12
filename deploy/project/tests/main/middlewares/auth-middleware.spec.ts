import { getMockReq, getMockRes } from '@jest-mock/express'
import { type NextFunction } from 'express'
import { UnauthorizedError } from '../../../src/application/errors'
import { authMiddleware } from '../../../src/main/middlewares'

jest.mock('@seenit-common/decrypter', () => {
  return {
    DecrypterAdapter: function () {
      return {
        decrypt: jest.fn().mockResolvedValue({ value: 1, permissions: ['R'] })
      }
    }
  }
})

describe('auth middleware', () => {
  let req = getMockReq({ headers: { authorization: 'fake_token' } })
  const res = getMockRes().res
  const next = getMockReq().next

  it('should call next on success', async () => {
    await authMiddleware(req, res, next as NextFunction)

    expect(next).toHaveBeenCalled()
  })

  it('should return 204 if no token provided', async () => {
    req = getMockReq({ headers: { } })

    await authMiddleware(req, res, next as NextFunction)

    expect(res.status).toHaveBeenCalled()
    expect(res.json).toHaveBeenCalledWith({ error: new UnauthorizedError() })
  })
})
