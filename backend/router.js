const express = require('express')
const userController = require('./controllers/userController')
const profileController = require('./controllers/profileController')
const eventController = require('./controllers/eventController')
const secureRoute = require('./middleware/secureRoute')
const router = express.Router()

router.route('/login')
  .post(userController.logIn)

router.route('/register')
  .post(userController.createUser)

router.route('/users')
  .get(userController.getAllUsers)

router.route('/profile/:userId')
  .post(secureRoute, profileController.setProfile)
  .put(secureRoute, profileController.editProfile)
  .get(profileController.getProfile)

router.route('/profiles')
  .get(profileController.getAllProfiles)

router.route('/events')
  .get(eventController.getAllEvents)

router.route('/events/new-event')
  .post(secureRoute, eventController.newEvent)

router.route('/events/:eventId')
  .put(secureRoute, eventController.editEvent)
  .get(eventController.getEvent)

router.route('/events/:eventId/comments')
  .post(secureRoute, eventController.newComment)

router.route('/events/:eventId/comments/:commentId')
  .put(secureRoute, eventController.editComment)
  .delete(secureRoute, eventController.deleteComment)

router.route('/events/:eventId/likes/remove')
  .put(secureRoute, eventController.removeLike)

router.route('/events/:eventId/likes/add')
  .put(secureRoute, eventController.addLike)

router.route('/events/:eventId/attendance/add')
  .put(secureRoute, eventController.addAttendance)

module.exports = router