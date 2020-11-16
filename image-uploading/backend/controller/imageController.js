const Image = require('../models/imageModel')

function uploadImage(req, res){
  console.log(req.params.name)
  Image
    .findOne({ name: req.params.name })
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
