import React, { useState, useEffect } from 'react'
import Banner from './Banner'
import NavBar from './NavBar'
import axios from 'axios'
import Toggle from 'react-toggle'

const AddEvent = (props) => {
  const userId = props.computedMatch.params.userId
  const [image, setImage] = useState('')
  const [formData, updateFormData] = useState({ eventName: '', location: '', date: '', description: '', image: '', invited: [], attending: [], hosts: [], notAttending: [], private: true })
  const [users, updateUsers] = useState([])

  console.log(formData)

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
      }
    )
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

  return <>
    <Banner />
    <main className="add-event-page">
      <div className="add-event">
        <h1 className="add-event-title">add event:</h1>
        <div className="add-event-form">
          <label className="add-event-label">name:</label>
          <input type="text" className="add-event-input" />
          <label className="add-event-label">location</label>
          <input type="text" className="add-event-input" />
          <label className="add-event-label">description</label>
          <input type="text" className="add-event-input" />
          <label className="add-event-label">date</label>
          <input type="date" className="add-event-input date" />
          <button className="add-event-upload" onClick={handleUpload}>upload image</button>
          <label htmlFor='private-status' className="add-event-label">Private</label>
          <Toggle
            className="editInput add-event-toggle"
            id='private-status'
            defaultChecked={formData.private}
            onChange={handleToggle}
            name="private" />
          
          
        </div>
      </div>
    </main>
    <NavBar />
  </>
}

export default AddEvent