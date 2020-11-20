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
         if(!resp.data.friends) {
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

  if(!viewCurrentUser.friends) {
    putFriend()
  } else {
    for (let i = 0; i < viewCurrentUser.friends.length; i++) {
      if (viewCurrentUser.friends[i]._id === userId.toString()) {
         updateFriend('friend')
         counter ++
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
    _id: userId}, {
      headers: { Authorization: `Bearer ${token}` }
    })
  .then (resp => {
    updateFriend('friend')
    updateCurrentUser(resp.data)
  })
}

function removeFriend() {
  axios.delete(`/api/profile/${userId}/friends`, {
    headers: { Authorization: `Bearer ${token}`}
  })
    .then(resp => {
      updateFriend('')
      updateCurrentUser(resp.data)
    })
}

  if (!viewProfile.user) {
    return <>
  {/* <Banner /> */}
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
      <main className="homepage">
        <section className="display-area">
          <div className="profile-header">
            <div className="flex-column flex-1">
              <img className="profile-image" src={viewProfile.user.image} alt={viewProfile.user.firstname} />
            </div>
            <div className="flex-column flex-1">
              <div id="second-row" className="flex-row">
                <div className="flex-column">
                  <h2>{viewProfile.friends.length}</h2>
                  <h3>Friends</h3>
                </div>
                <div className="flex-column">
                  <h2>{viewProfile.topFriends.length}</h2>
                  <h3>Top Friends</h3>
                </div>
                {currentUser === userId && <Link to={`/editprofile/${currentUser}`}>
                  <div className="settings-wheel"></div>
                  </Link>}
              </div>
            </div>
          </div>
          <div id="bio">
            <h2>{viewProfile.user.firstname} {viewProfile.user.lastname}</h2>
            <h3>{viewProfile.bio}</h3>
          </div>
          <div id="add-friend">
            {currentUser !== userId && <button className={friend} onClick={addFriend}>Friend</button>}
          </div>
          <div>
            {viewEvents.map((e, i) => {
              return <div key={i}>
                <div className="event-img">
                  <img src={e.image} alt="image"/>
                </div>
                <div className="event-content">
                  <Link to={`/events/${e._id}`} className="event-name">{e.eventName}</Link>
                  <p className="event-description">{`"${e.description}"`}</p>
                  <p className="event-info"><span>Date: </span>{handleDate(e.date)}</p>
                  <p className="event-info"><span>Location: </span>{e.location}</p>
                  <p className="event-info"><span>Creator: </span>{`${e.creator.firstname} ${e.creator.lastname}`}</p>
                  <div className="event-numbers">
                    <p className="event-num">{`Likes: ${e.likes}`}</p>
                    <p className="event-num">{`Attending: ${e.attending.length}`}</p>
                    <p className="event-num">{`Comments: ${e.comments.length}`}</p>
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