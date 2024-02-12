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
                id: '3',
                name: 'delete',
                accepted: Permissions.delete
              }]
            }
          }]
        })
      }
    }
  }
})
describe('delete user router', () => {
  it('should returns 400 if missing param id', async () => {
    await request(app)
      .delete('/api/user/delete')
      .set('authorization', 'valid_token')
      .send()
      .expect(400)
  })

  it('should returns 200 on succeds', async () => {
    const httpResponse = await request(app)
      .delete('/api/user/delete')
      .set('authorization', 'valid_token')
      .send({ id: 1 })
      .expect(200)
  })
})
