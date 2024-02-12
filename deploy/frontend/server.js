const express =  require('express')
const path =  require('path')

const app = express()



app.use('/public', express.static(path.join(__dirname, 'public')))

app.use('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.listen(5053, () => console.log('Running on 5053'))