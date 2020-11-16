const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String }
})

module.exports = mongoose.model('Image', imageSchema)