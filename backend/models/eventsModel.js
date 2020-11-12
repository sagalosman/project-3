const mongoose = require('mongoose')

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
 creator: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
 hosts: {type: Array}
},  
{
  timestamps: true
}
)

module.exports = mongoose.model('Events', eventsSchema)