import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Banner from '../components/Banner'
import NavBar from '../components/NavBar'
import { handleDate } from '../lib/DateFormat'


const ViewEvent = (props) => {
  const [eventData, updateEventData] = useState({})


  const eventId = props.computedMatch.params.eventId
  console.log(props.computedMatch)

  useEffect(() => {
    axios.get(`/api/events/${eventId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(resp => {
        updateEventData(resp.data)
        console.log(resp.data)
      })
  }, [])

  if (!eventData.description) {
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
    <main>
      <h1>{eventData.description}</h1>
      <h2>{handleDate(eventData.date)}</h2>
    </main>
    <NavBar />
  </>
}

export default ViewEvent