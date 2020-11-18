const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const { secret } = require('../config/environment')

function secureRoute(req, res, next) {
  const authToken = req.headers.authorization

  if (!authToken || !authToken.startsWith('Bearer')) {
    console.log('Unauthorized 1')
    return res.status(401).send({ message: 'Unauthorized 1' })
  }
  const token = authToken.replace('Bearer ', '')
  jwt.verify(token, secret, (err, payload) => {
    console.log('Unauthorized 2')
    if (err) return res.status(401).send({ message: 'Unauthorized 2' })
    const userId = payload.sub

    User
      .findById(userId)
      .then(user => {
        console.log('Unauthorized 3')
        if (!user) return res.status(401).send({ message: 'Unauthorized 3' })
        req.currentUser = user
        next()
      })
      .catch(() => res.status(401).send({ message: 'Unauthorized 4' }))
  })
}

module.exports = secureRoute
