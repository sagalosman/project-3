const express = require('express')
const router = express.Router()
const imageController = require('./controller/imageController')

router.route('/image/:name')
  .put(imageController.uploadImage)

module.exports = router