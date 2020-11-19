import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Banner from './Banner'
import NavBar from './NavBar'
import { handleDate } from '../lib/DateFormat'

const ViewProfile = (props) => {
  const userId = props.computedMatch.params.userId
  const friend = '5fb4ea4b7c6faf3ab025ca66'

  const [viewProfile, updateViewProfile] = useState({})
  const [viewEvents, updateViewEvents] = useState([])

  useEffect(() => {
    axios.get(`/api/profile/${userId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(resp => {
        updateViewProfile(resp.data)
        
      })
  }, [])

  useEffect(() => {
    axios.get(`/api/events/users/${userId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(resp => {
        console.log(resp.data)
        updateViewEvents(resp.data)
      })
  }, [])

  const addFriend = (event) => {
    event.preventDefault()
    console.log('hello')
    axios.put(`/api/profile/${viewProfile.user._id}/friends`), {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    }
      .then(resp => {
        console.log(resp)
     })
  }

  const addTopFriend = (event) => {
    event.preventDefault()
    event.value = 'selected'
    axios.put(`/api/profile/${viewProfile.user._id}/top-friends`, {},)
      .then(resp => {
        resp.history.push()
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
      <main>
        <section className="flex-container">
          <div className="profile-header">
            <div className="flex-column flex-1">
              <img className="profile-image" src={viewProfile.user.image} alt={viewProfile.user.firstname} />
            </div>
            <div className="flex-column flex-1">
              <div id="first-row" className="flex-row">
              </div>
              <div id="second-row" className="flex-row">
                <div className="flex-column">
                  <h2>{viewProfile.friends.length}</h2>
                  <h3>Friends</h3>
                </div>
                <div className="flex-column">
                  <h2>{viewProfile.topFriends.length}</h2>
                  <h3>Top Friends</h3>
                </div>
              </div>
            </div>
          </div>
          <div id="bio">
            <h2>{viewProfile.user.firstname} {viewProfile.user.lastname}</h2>
            <h3>{viewProfile.bio}</h3>
          </div>
          <div id="add-friend">
            <button onClick={addFriend}>Friend</button>
            <button onClick={addTopFriend}>Top Friend</button>
          </div>
          <div className="flex-container">
            {viewEvents.map((e, i) => {
              return <div key={i} className="flex-row party-information">
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