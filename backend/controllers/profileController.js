const Profile = require('../models/profileModel')

function setProfile(req, res) {
  const body = req.body
  req.body.user = req.currentUser
  Profile
    .create(body)
    .then(profile => res.send(profile))
    .catch(err => res.send(err))
}

function editProfile(req, res) {
  const body = req.body
  body.user = req.currentUser
  const userId = req.params.userId
  Profile.findOne({ user: { _id: userId } })
    .then(profile => {
      profile.set(body)
      profile.save()
      res.send(profile)
    })
    .catch(err => res.send(err))
}

function getProfile(req, res) {
  Profile.findOne({ user: { _id: req.params.userId } })
    .populate('user')
    .then(profile => {
      res.send(profile)
    })
    .catch(err => res.send(err))
}

function getAllProfiles(req, res) {
  Profile.find()
    .populate('user')
    .then(profile => {
      res.send(profile)
    })
    .catch(err => res.send(err))
}

module.exports = {
  setProfile,
  editProfile,
  getProfile,
  getAllProfiles
}