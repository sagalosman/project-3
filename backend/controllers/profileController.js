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
    .populate('user friends events topFriends')
    .then(profile => {
      res.send(profile)
    })
    .catch(err => res.send(err))
}

function getAllProfiles(req, res) {
  Profile.find()
    .populate('topFriends user friends')
    .then(profile => {
      res.send(profile)
    })
    .catch(err => res.send(err))
}

function addFriend(req, res) {
  const userId = req.params.userId
  const currentUser = req.currentUser._id.toString()
  Profile.find()
    .populate('user friends topFriends')
    .then(profiles => {
      const friendProfile = profiles.find(profile => {
        return profile.user._id.toString() === userId
      })
      
      const myProfile = profiles.find(profile => {
        return profile.user._id.toString() === currentUser
      })

      myProfile.friends.push(friendProfile.user)

      return myProfile.save()
    })
    .then(profile => res.send(profile))
    .catch(err => res.send(err))
}

function removeFriend(req, res) {
  const userId = req.params.userId
  const currentUser = req.currentUser._id.toString()
  Profile.find()
    .populate('user friends topFriends')
    .then(profiles => {
      const friendProfile = profiles.find(profile => {
        return profile.user._id.toString() === userId
      })
      
      const myProfile = profiles.find(profile => {
        return profile.user._id.toString() === currentUser
      })

      myProfile.friends.remove(friendProfile.user)

      return myProfile.save()
    })
    .then(profile => res.send(profile))
    .catch(err => res.send(err))
}

function addTopFriend(req, res) {
  const userId = req.params.userId
  const currentUser = req.currentUser._id.toString()
  Profile.find()
    .populate('user friends topFriends')
    .then(profiles => {
      const friendProfile = profiles.find(profile => {
        return profile.user._id.toString() === userId
      })
      
      const myProfile = profiles.find(profile => {
        return profile.user._id.toString() === currentUser
      })

      if (myProfile.topFriends.length < 3) {
        let canAdd = false
        for (let i = 0; i < myProfile.topFriends.length; i++) {
          if (myProfile.topFriends[i]._id.toString() === userId) {
            console.log('user already in top friends / cannot add self')
            return myProfile.save()
          } else {
            canAdd = true
          }
        }
        if (canAdd && currentUser !== userId) myProfile.topFriends.push(friendProfile.user)
      } else {
        console.log('Max 3 top friends')
      }
      
      return myProfile.save()
    })
    .then(profile => res.send(profile))
    .catch(err => res.send(err))
}

function removeTopFriend(req, res) {
  const userId = req.params.userId
  const currentUser = req.currentUser._id.toString()
  Profile.find()
    .populate('user friends topFriends')
    .then(profiles => {
      const friendProfile = profiles.find(profile => {
        return profile.user._id.toString() === userId
      })
      
      const myProfile = profiles.find(profile => {
        return profile.user._id.toString() === currentUser
      })

      myProfile.topFriends.remove(friendProfile.user)

      return myProfile.save()
    })
    .then(profile => res.send(profile))
    .catch(err => res.send(err))
}

module.exports = {
  setProfile,
  editProfile,
  getProfile,
  getAllProfiles,
  addFriend,
  removeFriend,
  addTopFriend,
  removeTopFriend
}