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
                id: '1',
                name: 'create',
                accepted: Permissions.create
              }]
            }
          }]
        })
      }
    }
  }
})

describe('create project router', () => {
  it('should returns 400 if missing param name', async () => {
    const http = await request(app)
      .put('/api/project/create')
      .set('authorization', 'valid_token')
      .send({ description: 'any_name' })
      .expect(400)
  })

  it('should returns 400 if missing param description', async () => {
    await request(app)
      .put('/api/project/create')
      .set('authorization', 'valid_token')
      .send({ name: 'any_name' })
      .expect(400)
  })

  it('should returns 200 on succeds', async () => {
    const httpResponse = await request(app)
      .put('/api/project/create')
      .set('authorization', 'valid_token')
      .send(createProjectModelMock)
      .expect(201)
  })
})
