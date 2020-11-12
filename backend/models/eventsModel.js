const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'Profile', required: true },
  text: {type: String, required: true},
},
{
  timestamps: true
}
)
const eventsSchema = new mongoose.Schema ({
 eventName: {type: String, required: true},
 location: {type: String, required: true},
 photo: {type: String, required: true},
 song: {type: String},
 comments: [ commentSchema ],
 description: {type: String, required: true},
 participants: {type: Array},
 attendance: {type: Number},
 likes: {type: Number},
 private: {type: Boolean},
 user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
 hosts: {type: Array},
 timeOfEvent: {type: Date, required: true}
},  
{
  timestamps: true
}
)

module.exports = mongoose.model('Events', eventsSchema)