const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const profileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  song: { type: String },
  events: { type: Array },
  friends: { type: Array },
  taggedEvents: { type: mongoose.Schema.ObjectId, ref: 'Events' },
  topFriends: { type: Array, required: true },
  photo: { type: String },
  bio: { type: String },
  recentEvents: { type: Array },
  publicOrPrivate: { type: Boolean, required: true }
})

profileSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Profile', profileSchema)
