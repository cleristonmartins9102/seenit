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
                id: '4',
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

describe('delete project router', () => {
  it('should returns 400 if missing param id', async () => {
    await request(app)
      .delete('/api/project/delete')
      .set('authorization', 'valid_token')
      .send()
      .expect(400)
  })

  it('should returns 200 on succeds', async () => {
    const httpResponse = await request(app)
      .delete('/api/project/delete')
      .set('authorization', 'valid_token')
      .send({ id: 1 })
      .expect(200)
  })
})
