import React, { useState, useEffect } from 'react'
import Banner from './Banner'
import NavBar from './NavBar'
import axios from 'axios'
import Toggle from 'react-toggle'
import { useHistory } from "react-router-dom"

const AddEvent = (props) => {
  const [users, updateUsers] = useState([])
  const [text, updateText] = useState('')
  const [invited, updateInvited] = useState(false)
  const [formData, updateFormData] = useState({
    creator: {},
    eventName: '',
    location: '',
    date: '',
    description: '',
    photo: '',
    invited: [],
    attending: [],
    hosts: [],
    notAttending: [],
    private: true,
    likes: 0
  })
  const token = localStorage.getItem('token')
  const parsedToken = JSON.parse(atob(token.split('.')[1]))
  const Id = parsedToken.sub
  let history = useHistory()

  useEffect(() => {
    axios.get('/api/users', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(resp => {
        updateUsers(resp.data)
        const currentUser = resp.data.filter(e => e._id === Id)
        const data = {
          ...formData,
          creator: currentUser[0]
        }
        updateFormData(data)
      })
  }, [])

  function handleChange(e) {
    const data = { ...formData, [e.target.name]: e.target.value }
    updateFormData(data)
  }

  function handleUpload() {
    window.cloudinary.createUploadWidget(
      {
        cloudName: 'dky2sqc0z',
        uploadPreset: 'clique1',
        cropping: true
      },
      (err, result) => {
        if (result.event !== 'success') {
          return
        }
        const data = {
          ...formData,
          photo: result.info.secure_url
        }
        updateFormData(data)
      }
    ).open()
  }

  function handleToggle(event) {
    const name = event.target.name
    const checked = event.target.checked

    const data = {
      ...formData,
      [name]: checked
    }

    updateFormData(data)
  }

  function handleDate(e) {
    const date = e.target.value
    const data = {
      ...formData,
      date
    }
    updateFormData(data)
  }

  function handleUserSearch() {
    const filteredUser = users.filter(e => {
      return e.username === text
    })
    const userObj = filteredUser[0]
    const data = { ...formData }
    data.invited.push(userObj)
    updateText('')
    updateInvited(true)
    updateFormData(data)
  }

  function handleSubmit() {
    axios.post('/api/events/new-event', formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(resp => {
        console.log(resp.data)
        history.push('/home')
      })
  }

  console.log(formData)

  return <>
    <Banner />
    <main className="add-event-page">
      <div className="add-event">
        <h1 className="add-event-title">add event:</h1>
        <div className="add-event-form">
          <label className="add-event-label">name:</label>
          <input type="text" onChange={handleChange} name="eventName" className="add-event-input" />
          <label className="add-event-label">location</label>
          <input type="text" onChange={handleChange} name="location" className="add-event-input" />
          <label className="add-event-label">description</label>
          <input type="text" onChange={handleChange} name="description" className="add-event-input" />
          <label className="add-event-label">date</label>
          <input type="date" onChange={handleDate} name="date" className="add-event-input date" />
          <label className="add-event-label">invite friends</label>
          <div className="invite-field">
            <input type="text" value={text} className="add-event-input event-invite-name" onChange={(e) => updateText(e.target.value)} />
            <button className="add-event-invite" onClick={() => handleUserSearch()}>invite</button>
          </div>
          <div className="add-event-invited-list">
            {invited && formData.invited.map((e, i) => {
              return <p key={i} className="add-event-invited-name">{e.firstname} {e.lastname}</p>
            })}
          </div>
          <button className="add-event-upload" onClick={handleUpload}>upload image</button>
          <div className="add-event-private">
            <label htmlFor='private-status' className="add-event-label">Private</label>
            <Toggle
              className="editInput add-event-toggle"
              id='private-status'
              defaultChecked={formData.private}
              onChange={handleToggle}
              name="private" />
          </div>
          <button className="add-event-submit" onClick={() => handleSubmit()}>create event</button>
        </div>
      </div>
    </main>
    <NavBar />
  </>
}

export default AddEvent