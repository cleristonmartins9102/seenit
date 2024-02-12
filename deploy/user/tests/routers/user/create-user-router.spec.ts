import request from 'supertest'

import { app } from '../../../src/main/config/app'
import { createUserModelMock } from '../../../src/application/mocks/create-user-model-mock'

describe('signup router', () => {
  beforeAll(() => {
    process.env.SECRET = 'secret'
  })

  it('should returns 400 if missing param firstName', async () => {
    const http = await request(app)
      .put('/api/user/signup')
      .set('authorization', 'valid_token')
      .send()
      .expect(400)
  })

  it('should returns 400 if missing param surname', async () => {
    await request(app)
      .put('/api/user/signup')
      .set('authorization', 'valid_token')
      .send()
      .expect(400)
  })

  it('should returns 400 if missing param email', async () => {
    await request(app)
      .put('/api/user/signup')
      .set('authorization', 'valid_token')
      .send()
      .expect(400)
  })

  it('should returns 400 if missing param email', async () => {
    await request(app)
      .put('/api/user/signup')
      .set('authorization', 'valid_token')
      .send()
      .expect(400)
  })

  it('should returns 200 on succeds', async () => {
    const http = await request(app)
      .put('/api/user/signup')
      .set('authorization', 'valid_token')
      .send(createUserModelMock)
      .expect(201)
  })
})
