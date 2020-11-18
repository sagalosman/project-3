const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true }
},
  {
    timestamps: true
  })
 
const eventsSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  location: { type: String, required: true },
  photo: { type: String, required: true },
  song: { type: String },
  comments: [commentSchema],
  description: { type: String, required: true },
  attending: [{ type: mongoose.Schema.ObjectId, ref: 'User', required: true }],
  invited: [{ type: mongoose.Schema.ObjectId, ref: 'User', required: true }],
  likes: { type: Number },
  private: { type: Boolean },
  creator: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  hosts: [{ type: mongoose.Schema.ObjectId, ref: 'User', required: true }],
  notAttending: [{ type: mongoose.Schema.ObjectId, ref: 'User', required: true }],
  date: { type: Date, required: true }
},
  {
    timestamps: true
  })

module.exports = mongoose.model('Events', eventsSchema)