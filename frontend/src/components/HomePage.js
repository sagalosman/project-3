import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { handleDate } from '../lib/DateFormat'
import NavBar from './NavBar'
import Banner from './Banner'

const HomePage = (props) => {
  const [events, updateEvents] = useState([])


  useEffect(() => {
    axios.get('api/events')
      .then(resp => updateEvents(resp.data))
  }, [])

  console.log(events)

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
            <div className="event-img">
              IMAGE
            </div>
            <div className="event-content">
              <h1 className="event-name">{e.eventName}</h1>
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
    </main>
    <NavBar />
  </>


}

export default HomePage