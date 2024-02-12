import { type Express } from 'express'
import { serve, setup } from 'swagger-ui-express'
import swageerConfig from '../docs/index'

export const setupSwagger = (app: Express): void => {
  app.use('/api-docs', serve, setup(swageerConfig))
}
