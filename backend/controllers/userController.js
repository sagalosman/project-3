const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')

function createUser(req, res) {
  const body = req.body
  console.log('hello')
  User
    .create(body)
    .then(user => res.send(user))
    .catch(error => {
      res.send(error)
    })
}

function logIn(req, res) {
  User
    .findOne({ email: req.body.email })
    .then(user => {
      if (!user.validatePassword(req.body.password)) {
        return res.status(401).send({ message: 'Unauthorised' })
      }
      const token = jwt.sign(
        { sub: user._id },
        secret,
        { expiresIn: '6h' }
      )
      res.status(200).send({ user, token, message: 'Login was successful' })
    })
}

module.exports = {
  createUser,
  logIn
}