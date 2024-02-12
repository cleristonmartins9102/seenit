import request from 'supertest'

import { app } from '../../../src/main/config/app'
import { createUserModelMock } from '../../../src/application/mocks/create-user-model-mock'
import { Permissions } from '../../../src/main/middlewares/permission-middleware'

jest.mock('@seenit-common/decrypter', () => {
  return {
    DecrypterAdapter: function () {
      return {
        decrypt: jest.fn().mockResolvedValue({
          value: 1,
          permissions: [{
            app: {
              name: 'user',
              id: '1',
              module: [{
                id: '2',
                name: 'update',
                accepted: Permissions.update
              }]
            }
          }]
        })
      }
    }
  }
})

describe('update user router', () => {
  it('should returns 400 if missing param id', async () => {
    await request(app)
      .post('/api/user/update')
      .set('authorization', 'valid_token')
      .send()
      .expect(400)
  })

  it('should returns 200 on succeds', async () => {
    const httpResponse = await request(app)
      .post('/api/user/update')
      .set('authorization', 'valid_token')
      .send({ id: 1, ...createUserModelMock })
      .expect(200)
  })
})
