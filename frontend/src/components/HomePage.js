import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { handleDate } from '../lib/DateFormat'
import NavBar from './NavBar'
import Banner from './Banner'

const HomePage = (props) => {
  const [events, updateEvents] = useState([])

  useEffect(() => {
    axios.get('api/events/public', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(resp => updateEvents(resp.data))
  }, [])

  console.log(events)

  function handleLike(e) {
    axios.put(`api/events/${e._id}/likes/add`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(resp => {
        axios.get('api/events/public', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
          .then(resp => updateEvents(resp.data))
      })
  }

  if (!events[0]) {
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
    <Banner />
    <main className="homepage">
      <div className="display-area">
        {events.map((e, i) => {
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
                <div className="event-num" onClick={() => handleLike(e)}>
                  <p className="event-like"></p> {e.likes}
                </div>
                <div className="event-num">
                  <p className="event-attending"></p> {e.attending.length}
                </div>
                <div className="event-num">
                  <p className="event-comments"></p> {e.comments.length}
                </div>
              </div>

            </div>

          </div>
        })}
      </div>
    </main>
    <NavBar />
  </>


}

export default HomePage