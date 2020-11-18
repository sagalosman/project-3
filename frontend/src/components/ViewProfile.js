import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
// import NavBar from './NavBar'

const ViewProfile = (props) => {
  const userId = '5fb4f8aec81181045fdeba4c'
  const [viewProfile, updateViewProfile] = useState({})
  const [viewEvents, updateViewEvents] = useState([])

  useEffect(() => {
    axios.get(`/api/profile/${userId}`)
      .then(resp => {
        updateViewProfile(resp.data)
        console.log(resp.data)
      })
  }, [])

  useEffect(() => {
    axios.get(`/api/events/${userId}`)
      .then(resp => {
        updateViewEvents(resp.data)
        console.log(resp.data)
      })
  }, [])

  const addFriend = (event) => {
    event.preventDefault()
    event.value = 'selected'
    axios.put(`/api/profile/${friend}/friends`)
      .then(resp => {
        resp.history.push()
      })
  }

  const addTopFriend = (event) => {
    event.preventDefault()
    event.value = 'selected'
    axios.put(`/api/profile/${friend}/top-friends`)
      .then(resp => {
        resp.history.push()
      })
  }

  if (!viewProfile.user) {
    return <div>
      <h1>Loading</h1>
    </div>
  } else {
    return <section className="flex-container">
      <div className="profile-header">
        <div className="flex-column flex-1">
          <p>Photo</p>
        </div>
        <div className="flex-column flex-2">
          <div id="first-row" className="flex-row">
            <div className="flex-column">
              {/* <h4>{viewProfile.events.length}</h4> */}
              <h6>Events</h6>
            </div>
            <div className="flex-column">
              {/* <h4>{viewProfile.recentEvents.length}</h4> */}
              <h6>Recent</h6>
            </div>
            <div className="flex-column">
              {/* <h4>{viewProfile.taggedEvents.length}</h4> */}
              <h6>Tagged</h6>
            </div>
          </div>
          <div id="second-row" className="flex-row">
            <div className="flex-column">
              {/* <h4>{viewProfile.friends.length}</h4> */}
              <h6>Friends</h6>
            </div>
            <div className="flex-column">
              <h4>{viewProfile.topFriends.length}</h4>
              <h6>Top Friends</h6>
            </div>
          </div>
        </div>
      </div>
      <div id="bio">
        <h5>{viewProfile.user.firstname} {viewProfile.user.lastname}</h5>
        <h6>{viewProfile.bio}</h6>
      </div>
      <div id="add-friend">
        <button onClick={addFriend}>Friend</button>
        <button onClick={addTopFriend}>Add Top Friend</button>
      </div>
      <article id="events">
        <div className="flex-row">
          <div><h3>Events</h3></div>
          {/* {viewEvents.events.map((event, index) => {
            return <div key={index}>
              <h1>{event.eventName}</h1>
            </div>
          })} */}
        </div>
      </article>
    </section>
  }
}


export default ViewProfile