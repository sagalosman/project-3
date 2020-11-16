const Image = require('../models/imageModel')

function uploadImage(req, res){
  console.log(req.params.name)
  Image
    .findOne({ user: { _id: req.params.userId } })
    .then(image => {
      console.log('success')
      console.log(image)
      image.set(req.body)
      return image.save()
    })
    .then((image) => res.send(image))
    .catch(error => res.send(error))
}

module.exports = {
  uploadImage
}
