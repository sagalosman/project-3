const mongoose = require('mongoose')
const Image = require('./models/imageModel')

mongoose.connect(
  'mongodb://localhost/imagedb',
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) return console.log(err)

    console.log('Mongoose connected!')
    mongoose.connection.db.dropDatabase()
      .then(() => {
        return Image.create([
          {
            name: 'alis_test_image',
            url: ''
          }
        ])
      })
      .then(images => {
        console.log(`${images.length} image(s) have been created!`)
        return images
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        mongoose.connection.close()
      })
  }
)