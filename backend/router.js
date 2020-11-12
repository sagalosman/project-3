const express = require('express')
const userController = require('./controllers/userController')
const profileController = require('./controllers/profileController')
const secureRoute = require('./middleware/secureRoute')
const router = express.Router()

router.route('/login')
  .post(userController.logIn)

router.route('/register')
  .post(userController.createUser)

router.route('/profile/:userId')
  .post(secureRoute, profileController.setProfile)
  .put(secureRoute, profileController.editProfile)
  .get(profileController.getProfile)

module.exports = router