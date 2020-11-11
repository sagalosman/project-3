const express = require('express')
const expressServer = express()
const { port } = require('./config/environment')
require('dotenv').config()

// For environment varibles
console.log(process.env.hello)

expressServer.use((req, res, next) => {
  console.log(`Incoming request, ${req.method} to ${req.url}`)
  next()
})

// We can give it whichever port we like, but it must be unique!
expressServer.listen(port)
