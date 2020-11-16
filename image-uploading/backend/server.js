const express = require('express')
const expressServer = express()
const { port } = require('./config/environment')
require('dotenv').config()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Router = require('./router')

mongoose.connect(
  'mongodb://localhost/imagedb',
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    // * err -> tells you why you can't connect if you fail to connect
    if (err) console.log(err)
    else console.log('Mongoose connected successfully!')
  }
)


expressServer.use((req, res, next) => {
  console.log(`Incoming request, ${req.method} to ${req.url}`)
  next()
})

expressServer.use(bodyParser.json())

expressServer.use('/api', Router)

// We can give it whichever port we like, but it must be unique!
expressServer.listen(port)
