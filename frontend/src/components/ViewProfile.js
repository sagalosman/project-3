import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Banner from './Banner'
import NavBar from './NavBar'
import { handleDate } from '../lib/DateFormat'
import { getUserId } from '../lib/UserToken'

const ViewProfile = (props) => {

  const userId = props.computedMatch.params.userId

  const [viewProfile, updateViewProfile] = useState({})
  const [viewEvents, updateViewEvents] = useState([])
  const [viewCurrentUser, updateCurrentUser] = useState([])
  const [friend, updateFriend] = useState('')

  const token = localStorage.getItem('token')
  const currentUser = getUserId(token)

  useEffect(() => {
    axios.get(`/api/profile/${userId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(resp => {
        updateViewProfile(resp.data)
      })
  }, [])

  useEffect(() => {
    axios.get(`/api/profile/${currentUser}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(resp => {
        updateCurrentUser(resp.data)
        if (!resp.data.friends) {
          return
        } else {
          for (let i = 0; i < resp.data.friends.length; i++) {
            if (resp.data.friends[i]._id === userId.toString()) {
              updateFriend('friend')
            }
          }
        }
      })
  }, [])

  useEffect(() => {
    axios.get(`/api/events/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateViewEvents(resp.data)
      })
  }, [])

  function addFriend() {
    event.preventDefault()
    let counter = 0

    if (!viewCurrentUser.friends) {
      putFriend()
    } else {
      for (let i = 0; i < viewCurrentUser.friends.length; i++) {
        if (viewCurrentUser.friends[i]._id === userId.toString()) {
          updateFriend('friend')
          counter++
        }
      }

      if (!counter) {
        putFriend()
      } else {
        removeFriend()
      }
    }
  }

  function putFriend() {
    axios.put(`/api/profile/${userId}/friends`, {
      firstname: viewProfile.user.firstname,
      lastname: viewProfile.user.lastname,
      username: viewProfile.user.username,
      _id: userId
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateFriend('friend')
        updateCurrentUser(resp.data)
      })
  }

  function removeFriend() {
    axios.delete(`/api/profile/${userId}/friends`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateFriend('')
        updateCurrentUser(resp.data)
      })
  }

  function addTopFriend() {
    event.preventDefault()

  }


  if (!viewProfile.user) {
    return <>
      <Banner />
      <main className="homepage">
        <div className="display-area">
          <h1 className="loading">Loading...</h1>
        </div>
      </main>
      {/* <NavBar /> */}
    </>
  }
  return <>
    <Banner />
    <main>
      <section className="flex-container">
        <div className="display-area">
        <div className="profile">
          {/* <div className="flex-column image IMAGE"> */}
          <div className="event-left">
            <img className="event-img" src={viewProfile.user.image} alt={viewProfile.user.firstname} />
          </div>
          <div className="event-content">
            <h2 className="event-name">{viewProfile.user.firstname} {viewProfile.user.lastname}</h2>
            <h3 className="event-description">{viewProfile.bio}</h3>
          </div>

          <div className="event-info">
            <h2>{viewProfile.friends.length}</h2>
            <h3>Friends</h3>
            {currentUser === userId && <Link to={`/editprofile/${currentUser}`}>
            <div className="settings-wheel"></div>
            </Link>}
          </div>
          <div className="event-num">
            {currentUser !== userId && <button className={friend} onClick={addFriend}>Friend</button>}
          </div>
        </div>
        </div>

        <div className="display-area">
          {viewEvents.map((e, i) => {
            return <div key={i} className="event">
              <Link to={`/events/${e._id}`} className="event-left">
                <img className="event-img" src={e.photo} alt="image" />
              </Link>
              <div className="event-content">
                <h1 className="event-name">{e.eventName}</h1>
                <p className="event-description">{`"${e.description}"`}</p>
                <p className="event-info"><span>Date: </span>{handleDate(e.date)}</p>
                <p className="event-info"><span>Location: </span>{e.location}</p>
                <p className="event-info"><span>Creator: </span>{`${e.creator.firstname} ${e.creator.lastname}`}</p>
                <div className="event-numbers">
                  <div className="event-num">
                    <p className="event-like">{e.likes}</p>
                  </div>
                  <div className="event-num">
                    <p className="event-attending">{e.attending.length}</p>
                  </div>
                  <div className="event-num">
                    <p className="event-comments">{e.comments.length}</p>
                  </div>
                </div>
              </div>
            </div>
          })}
        </div>

      </section>
    </main>
    <NavBar />
  </>
}
export default ViewProfile