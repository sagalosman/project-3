const { Redirect } = require('react-router-dom')
const { Template } = require('webpack')
const Events = require('../models/eventsModel')

function newEvent(req, res) {
  const body = req.body
  body.user = req.currentUser
  Events
    .create(body)
    .then(events => res.send(events))
    .catch(err => res.send(err))
}

function getEvent(req, res) {
  Events.findById(req.params.eventId)
    .populate('creator participants invited hosts')
    .then(event => {
      res.send(event)
    })
    .catch(err => res.send(err))
}

function getAllEvents(req, res) {
  Events.find()
    .populate('creator participants invited hosts')
    .then(event => res.send(event))
    .catch(err => res.send(err))
}

function editEvent(req, res) {
  const body = req.body
  body.user = req.currentUser
  const eventId = req.params.eventId
  Events.findOne({ _id: eventId })
    .populate('creator participants invited hosts')
    .then(event => {
      event.set(body)
      event.save()
      res.send(event)
    })
    .catch(err => res.send(err))
}

function newComment(req, res) {
  const comment = req.body
  comment.user = req.currentUser
  const eventId = req.params.eventId
  Events.findOne({ _id: eventId })
    .populate('comments.user')
    .then(event => {
      if (!event) return res.status(404).send({ status: 'No event found' })
      event.comments.push(comment)
      return event.save()
    })
    .then(event => res.send(event))
    .catch(err => res.send(err))
}

function editComment(req, res) {
  const body = req.body
  body.user = req.currentUser
  const eventId = req.params.eventId
  const commentId = req.params.commentId
  Events.findOne({ _id: eventId })
    .populate('comments.user')
    .then(event => {
      const comment = event.comments.id(commentId)
      comment.set(body)
      return comment.save()
    })
    .then(event => res.send(event))
    .catch(err => res.send(err))
}

function deleteComment(req, res) {
  const eventId = req.params.eventId
  const commentId = req.params.commentId
  Events.findOne({ _id: eventId })
    .then(event => {
      const comment = event.comments.id(commentId)
      if (!comment.user.equals(req.currentUser._id)) return res.status(404).send({ status: 'Unauthorised' })
      comment.remove()
      return event.save()
    })
    .then(event => {
      res.send(event)
    })
    .catch(err => res.send(err))
}

function addLike(req, res) {
  const eventId = req.params.eventId
  Events.findOne({ _id: eventId })
    .then(event => {
      event.likes = event.likes + 1
      return event.save()
    })
    .then(event => res.send(event))
    .catch(err => res.send(err))
}

function removeLike(req, res) {
  const eventId = req.params.eventId
  Events.findOne({ _id: eventId })
    .then(event => {
      event.likes = event.likes - 1
      return event.save()
    })
    .then(event => res.send(event))
    .catch(err => res.send(err))
}

function addAttendance(req, res) {
  const eventId = req.params.eventId
  const userId = req.currentUser._id
  const user = req.currentUser
  Events.findOne({ _id: eventId })
    .populate('creator participants invited hosts')
    .then(event => {
      const participants = event.participants
      participants.push(user)
      return event
    })
    .then(event => {
      const invitedUser = event.invited.find(user => user._id.equals(userId))
      console.log(invitedUser)
      invitedUser.remove()
      return event.save()
    })
    .then(event => res.send(event))
    .catch(err => res.send(err))
}

module.exports = {
  newEvent,
  newComment,
  getEvent,
  getAllEvents,
  editEvent,
  editComment,
  deleteComment,
  addLike,
  removeLike,
  addAttendance
}