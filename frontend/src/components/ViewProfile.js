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
  // const [viewUser, updateViewUser] = useState({})
  const [viewEvents, updateViewEvents] = useState([])
  const [friend, updateFriend] = useState('')

  const token = localStorage.getItem('token')
  const currentUser = getUserId(token)
  

  console.log(viewProfile)
  useEffect(() => {
    axios.get(`/api/profile/${userId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(resp => {
        updateViewProfile(resp.data)
        console.log(viewProfile)
      })
  }, [])
  
  // useEffect(() => {
  //   axios.get(`/api/user/${userId}`, {
  //     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  //   })
  //     .then(resp => {
  //       updateViewUser(resp.data)
        
  //     })
  // }, [])

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

    axios.put(`/api/profile/${userId}/friends`, { 
      firstname: viewProfile.user.firstname,
      lastname: viewProfile.user.lastname,
      username: viewProfile.user.username,
      _id: '5fb4ea4b7c6faf3ab025ca67'})
    .then (resp => {
      updateViewProfile(resp.data)
    })
  }

  const addTopFriend = (event) => {
    event.preventDefault()

    axios.put(`/api/profile/${viewProfile.user._id}/top-friends`, {},)
      .then(resp => {
        updateViewProfile(resp.data)
      })
  }

  if (!viewProfile.user) {
    return <>
  <Banner />
  <main className="homepage">
    <div className="display-area">
      <h1 className="loading">Loading...</h1>
    </div>
  </main>
  <NavBar />
</>
}

    return <>
    {console.log(viewProfile)}
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
            {currentUser !== userId && <button onClick={addFriend}>Friend</button>}
            {currentUser !== userId && <button onClick={addTopFriend}>Top Friend</button>}
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