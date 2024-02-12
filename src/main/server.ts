import { app } from './config/app'

const port = process.env.APP_PORT ?? 3000
app.listen(port, () => { console.log(`Running on localhost:${port}`) })
