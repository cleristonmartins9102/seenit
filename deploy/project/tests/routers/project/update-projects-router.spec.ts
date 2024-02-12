import request from 'supertest'

import { app } from '../../../src/main/config/app'
import { createProjectModelMock } from '../../../src/application/mocks/models-mock'
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
                id: '3',
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

describe('update projects router', () => {
  it('should returns 400 if missing param id', async () => {
    await request(app)
      .post('/api/project/update')
      .set('authorization', 'valid_token')
      .send()
      .expect(400)
  })

  it('should returns 200 on succeds', async () => {
    const httpResponse = await request(app)
      .post('/api/project/update')
      .set('authorization', 'valid_token')
      .send({ id: 1, ...createProjectModelMock })
      .expect(200)
  })
})
