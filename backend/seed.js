const mongoose = require('mongoose')
const User = require('./models/userModel')
const Profile = require('./models/profileModel')
const Event = require('./models/eventsModel')
const Image = require('./models/imageModel')

mongoose.connect(
  'mongodb://localhost/cliquedb',
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) console.log(err)

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
      .then(() => {
        return User.create([
          {
            firstname: 'Mitchell',
            lastname: 'Thomas',
            password: 'mitch',
            passwordConfirmation: 'mitch',
            username: 'mitty',
            email: 'mitty@mitty.com',
            photo: 'Warning'
          },
          {
            firstname: 'Harry',
            lastname: 'Todd',
            password: 'harry',
            passwordConfirmation: 'harry',
            username: 'harry',
            email: 'harry@harry.com',
            photo: 'Warning'
          },
          {
            firstname: 'Natasha',
            lastname: 'Taylor',
            password: 'natasha',
            passwordConfirmation: 'natasha',
            username: 'natasha',
            email: 'natasha@natasha.com',
            photo: 'Warning'
          },
          {
            firstname: 'Sagal',
            lastname: 'Osman',
            password: 'sagal',
            passwordConfirmation: 'sagal',
            username: 'sagal',
            email: 'sagal@sagal.com',
            photo: 'Warning'
          }
        ])
      })
      .then((users) => {
        console.log(`${users.length} users have been created`)
        return users
      })
      .then((users) => {
        return Profile
          .create([
            {
              user: users[0],
              topFriends: [],
              friends: [],
              bio: 'BFG',
              private: true
            },
            {
              user: users[1],
              friends: [],
              topFriends: [],
              bio: 'I have been classed as a foot',
              private: true
            },
            {
              user: users[2],
              friends: [],
              topFriends: [],
              bio: 'The friendly square',
              private: true
            },
            {
              user: users[3],
              friends: [],
              topFriends: [],
              bio: 'Hamburger',
              private: true
            }
          ])
      })
      .then(profiles => {
        console.log(`${profiles.length} profiles have been created.`)
        return profiles
      })
      .then(profiles => {
        return Event
          .create([
            {
              eventName: "Harry's Party",
              creator: profiles[0].user,
              location: 'Party Town',
              photo: 'Legend',
              song: 'Baby shark',
              description: 'Come and have a few tinnies with ye old Haz dog',
              invited: [profiles[1].user, profiles[3].user],
              notAttending: [profiles[2].user],
              attendance: 3,
              likes: 0,
              private: false,
              date: new Date(2020, 11, 12)
            },

            {
              eventName: "juice",
              creator: profiles[2].user,
              location: 'Party Town',
              photo: 'Legend',
              song: 'Baby shark',
              description: 'Come and have a few tinnies with ye old Haz dog',
              invited: [profiles[0].user, profiles[3].user],
              attendance: 3,
              likes: 0,
              private: true,
              date: new Date(2021, 1, 17)
            }

          ])
      })
      .then(events => {
        console.log(`${events.length} events have been created`)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        mongoose.connection.close()
      })
  }
)