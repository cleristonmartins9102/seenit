import request from 'supertest'

import { app } from '../../../src/main/config/app'
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
                id: '1',
                name: 'load',
                accepted: Permissions.read
              }]
            }
          }]
        })
      }
    }
  }
})
describe('load users router', () => {
  it('should returns 200 on succeds', async () => {
    await request(app)
      .get('/api/user/load')
      .set('authorization', 'valid_token')
      .send()
      .expect(200)
  })
})
