const express = require('express')
const userController = require('./controllers/userController')
const router = express.Router()

router.route('/login')
  .post(userController.logIn)

router.route('/register')
  .post(userController.createUser)

module.exports = router