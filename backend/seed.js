const mongoose = require('mongoose')
const User = require('./models/userModel')
const Profile = require('./models/profileModel')
const Event = require('./models/eventsModel')

mongoose.connect(
  'mongodb://localhost/cliquedb',
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) console.log(err)

    mongoose.connection.db.dropDatabase()
      .then(() => {
        return User.create([
          {
            firstname: 'Mitchell',
            lastname: 'Thomas',
            password: 'mitch',
            passwordConfirmation: 'mitch',
            username: 'mitty',
            email: 'mitty@mitty.com',
            image: 'https://res.cloudinary.com/dky2sqc0z/image/upload/v1605526916/1200px-User_font_awesome.svg_oa84gz.png'
          },
          {
            firstname: 'Harry',
            lastname: 'Todd',
            password: 'harry',
            passwordConfirmation: 'harry',
            username: 'harry',
            email: 'harry@harry.com',
            image: 'https://res.cloudinary.com/dky2sqc0z/image/upload/v1605526916/1200px-User_font_awesome.svg_oa84gz.png'
          },
          {
            firstname: 'Natasha',
            lastname: 'Taylor',
            password: 'natasha',
            passwordConfirmation: 'natasha',
            username: 'natasha',
            email: 'natasha@natasha.com',
            image: 'https://res.cloudinary.com/dky2sqc0z/image/upload/v1605526916/1200px-User_font_awesome.svg_oa84gz.png'
          },
          {
            firstname: 'Sagal',
            lastname: 'Osman',
            password: 'sagal',
            passwordConfirmation: 'sagal',
            username: 'sagal',
            email: 'sagal@sagal.com',
            image: 'https://res.cloudinary.com/dky2sqc0z/image/upload/v1605526916/1200px-User_font_awesome.svg_oa84gz.png'
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
              photo: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/birthday-party-for-cute-child-royalty-free-image-700712598-1552358033.jpg',
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
              photo: 'https://res.cloudinary.com/dky2sqc0z/image/upload/v1605526916/1200px-User_font_awesome.svg_oa84gz.png',
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