const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const profileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  song: { type: String },
  friends: [{ type: mongoose.Schema.ObjectId, ref: 'User', required: true }],
  topFriends: [{ type: mongoose.Schema.ObjectId, ref: 'User', required: true }],
  bio: { type: String },
  private: { type: Boolean, required: true }
})

profileSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Profile', profileSchema)
