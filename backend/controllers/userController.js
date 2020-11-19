const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')

function createUser(req, res) {
  const body = req.body
  req.body.image = 'https://res.cloudinary.com/dky2sqc0z/image/upload/v1605526916/1200px-User_font_awesome.svg_oa84gz.png'
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

function getAllUsers(req, res) {
  User.find()
    .then(user => {
      res.send(user)
    })
    .catch(err => res.send(err))
}

function uploadImage(req, res){
  const userId = req.params.userId
  User
    .findById(userId)
    .then(image => {
      console.log(image.params)
      image.set(req.body)
      image.save()
      return image
    })
    .then((image) => res.send(image))
    .catch(error => res.send(error))
}

function getUser(req, res) {
  User.findOne({_id: req.params.userId })
    .then(user => {
      res.send(user)
    })
    .catch(err => res.send(err))
}

function editUser(req, res) {
  const body = req.body
  body.user = req.currentUser
  const userId = req.params.userId
  User.findOne({_id: userId })
    .then(user => {
      user.set(body)
      return user.save()
    })
    .then(user => {
      res.send(user)
    })
    .catch(err => res.send(err))
}

module.exports = {
  createUser,
  logIn,
  getAllUsers,
  uploadImage,
  getUser,
  editUser
}