import sinon from 'sinon'
import { assert } from '@sinonjs/referee-sinon'
import jsonwebtoken from 'jsonwebtoken'
import { JwtAdapter } from '../../../../src/infra/adapters/jwt-adapter'
import { MissingJWTSecret } from '../../../../src/application/errors'
import timekeeper from 'timekeeper'

import dot from 'dotenv'
import { Permissions } from '../../../../src/main/middlewares/permission-middleware'

dot.config()

describe('Jwt Adapter', () => {
  const defaultPermissions = [
    {
      app: {
        name: 'user',
        id: '1',
        module: [{
          id: '3',
          name: 'delete',
          accepted: Permissions.delete
        }]
      }
    }
  ]
  beforeAll(() => {
    process.env.SECRET = 'secret'
  })
  beforeEach(sinon.restore)
  it('should call sign with correct data', async () => {
    timekeeper.freeze('2024-02-09T11:00:00.000Z')
    const sut = new JwtAdapter()
    const jwtSpy = sinon.spy(jsonwebtoken, 'sign')

    await sut.encrypt({ id: 10, firstName: 'any_name', surname: 'any_surname', email: 'any_email', permissions: defaultPermissions })

    assert(jwtSpy.called)
    assert.equals(jwtSpy.getCall(0).args[0], { id: 10, firstName: 'any_name', surname: 'any_surname', email: 'any_email', permissions: defaultPermissions, expectedDate: '2024-02-09T11:00:00.000Z' })
    assert.equals(jwtSpy.getCall(0).args[1], 'secret')
  })

  it('should returns the JWT', async () => {
    const sut = new JwtAdapter()
    sinon.stub(jsonwebtoken, 'sign').returns('any_jwt' as unknown as undefined)
    const jwt = await sut.encrypt({ id: 10, firstName: 'any_name', surname: 'any_surname', email: 'any_email', permissions: defaultPermissions })

    expect(jwt).toBe('any_jwt')
  })

  it('should throw if no secret found in the env', async () => {
    const sut = new JwtAdapter()
    const secret = process.env.SECRET
    delete process.env.SECRET

    const error = sut.encrypt({ id: 10, firstName: 'any_name', surname: 'any_surname', email: 'any_email', permissions: defaultPermissions })

    await expect(error).rejects.toThrow(new MissingJWTSecret())
    process.env.SECRET = secret
  })
})
