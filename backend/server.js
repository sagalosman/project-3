const express = require('express')
const expressServer = express()
const { port } = require('./config/environment')
require('dotenv').config()
const mongoose = require('mongoose')
const Router = require('./router')
const bodyParser = require('body-parser')


mongoose.connect( 
  'mongodb://localhost/cliquedb',
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    // * err -> tells you why you can't connect if you fail to connect
    if (err) console.log(err)
    else console.log('Mongoose connected successfully!')
  }
)

// For environment varibles
// console.log()

expressServer.use((req, res, next) => {
  console.log(`Incoming request, ${req.method} to ${req.url}`)
  next()
})

// We can give it whichever port we like, but it must be unique!
expressServer.use(bodyParser.json())
expressServer.use('/api', Router)
expressServer.listen(port)



