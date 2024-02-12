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
              name: 'project',
              id: '2',
              module: [{
                id: '2',
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

describe('load projects router', () => {
  it('should returns 200 on succeds', async () => {
    await request(app)
      .get('/api/project/load')
      .set('authorization', 'valid_token')
      .send()
      .expect(200)
  })
})
