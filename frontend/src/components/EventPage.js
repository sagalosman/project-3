import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import NavBar from './NavBar'
import Banner from './Banner'
import { handleDate } from '../lib/DateFormat'
import { formatTime } from '../lib/TimeFormat'

const EventPage = (props) => {
  const [event, updateEvent] = useState({})
  const [text, updateText] = useState('')
  const [comments, updateComments] = useState(true)
  const [attending, updateAttending] = useState('')
  const id = props.computedMatch.params.eventId

  useEffect(() => {
    axios.get(`/api/events/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(resp => {
        updateEvent(resp.data)
        console.log(resp.data)
      })
  }, [])

  function handleLike(e) {
    axios.put(`/api/events/${e._id}/likes/add`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(resp => {
        axios.get(`/api/events/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
          .then(resp => updateEvent(resp.data))
      })
  }

  function handleComment() {
    updateText('')
    axios.post(`/api/events/${id}/comments`, { text }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(resp => {
        axios.get(`/api/events/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
          .then(resp => updateEvent(resp.data))
      })
  }

  function handleAttending(e) {
    if (e === 'add') {
      updateAttending(true)
      axios.put(`/api/events/${id}/attendance/add`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
        .then(resp => {
          axios.get(`/api/events/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          })
            .then(resp => updateEvent(resp.data))
        })
    } else {
      updateAttending(false)
      axios.put(`/api/events/${id}/attendance/remove`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
        .then(resp => {
          axios.get(`/api/events/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          })
            .then(resp => updateEvent(resp.data))
        })
    }
  }

  if (!event.creator) {
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
    <main className="column">
      <div className="one-event-content">
        <div className="one-event-top">
          <img src={event.photo} alt={event.eventName} className="one-event-img" />
          <h1 className="one-event-title">{event.eventName}</h1>
        </div>
        <div className="one-event-bottom">
          <p className="event-description">{`"${event.description}"`}</p>
          <p className="event-info info-big"><span>Date: </span><br />{handleDate(event.date)}</p>
          <p className="event-info info-big"><span>Location: </span><br />{event.location}</p>
          <p className="event-info info-big"><span>Creator: </span><br />{`${event.creator.firstname} ${event.creator.lastname}`}</p>
          <div className="event-numbers one-event-numbers">
            <div className="event-num big-num" onClick={() => handleLike(event)}>
              <p className="event-like icon-bigger"></p> {event.likes}
            </div>
            <div className="event-num big-num" onClick={() => updateComments(false)}>
              <p className="event-attending icon-bigger"></p> {event.attending.length}
            </div>
            <div className="event-num end big-num" onClick={() => updateComments(true)}>
              <p className="event-comments icon-bigger"></p> {event.comments.length}
            </div>
          </div>
        </div>
      </div>
      {comments && <div className="one-event-comments">
        <div className="comments-list">
          {event.comments.map((c, i) => {
            return <div key={i} className="comment">
              <div className="comment-top">
                <h1 className="comment-name">@{c.user.username}</h1>
                <p className="comment-time">{formatTime(c.createdAt)}</p>
              </div>
              <p className="comment-text">"{c.text}"</p>
            </div>
          })}
        </div>
        <div className="add-comment">
          <textarea value={text} onChange={(e) => updateText(e.target.value)} className="textarea" placeholder="Add a comment..."></textarea>
          <button className="post-comment" onClick={() => handleComment()}>post</button>
        </div>
      </div>}
      {!comments && <div className="one-event-attendance">
        <div className="one-attendance-top">
          <div className="attendance-list">
            <h1 className="attendance-title">invited:</h1>
            {event.invited.map((e, i) => {
              return <Link key={i} to={`/profile/users/${e._id}`} className="attendance-name">
                {e.firstname} {e.lastname}
              </Link>
            })}
          </div>
          <div className="attendance-list">
            <h1 className="attendance-title">attending:</h1>
            {event.attending.map((e, i) => {
              return <Link key={i} to={`/profile/users/${e._id}`} className="attendance-name">
                {e.firstname} {e.lastname}
              </Link>
            })}
          </div>
          <div className="attendance-list">
            <h1 className="attendance-title">not attending:</h1>
            {event.notAttending.map((e, i) => {
              return <Link key={i} to={`/profile/users/${e._id}`} className="attendance-name">
                {e.firstname} {e.lastname}
              </Link>
            })}
          </div>
        </div>
        <div className="one-attendance-bottom">
          <p className="attend" onClick={() => {
            if (attending === '' || attending === false) {
              handleAttending('add')
            } else {
              return
            }
          }}></p>
          <p className="not-attend" onClick={() => {
            if (attending === '' || attending === true) {
              handleAttending('remove')
            } else {
              return
            }
          }}></p>
        </div>
      </div>}
    </main>
    <NavBar />
  </>
}

export default EventPage