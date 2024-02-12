import { serve, setup} from 'swagger-ui-express'
import express from 'express'
import { swageerConfig } from './ main/docs'


const app = express()

app.use('/api-docs', serve, setup(swageerConfig))

app.listen(5052, () => console.log('Running on 5052'))