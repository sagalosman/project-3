import React, { useState, useEffect } from 'react'
import Toggle from 'react-toggle'
import axios from 'axios'
// import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import Banner from './Banner'

const Edit = (props) => {
  console.log(props)
  const userId = props.match.params.userId
  const [image, setImage] = useState('')
  // const [api, updateApi] = useState([])
  const [formData, updateFormData] = useState({
    email: '',
    password: '',
    passwordConfirmation: '',
    firstname: '',
    lastname: '',
    image: '',
    song: '',
    topFriends: '',
    bio: '',
    private: true
  })

  useEffect(() => {
    axios.get(`/api/profile/${userId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(resp => {
        updateFormData(resp.data)
        console.log(resp.data)
      })
  }, [])

  // useEffect(() => {
  //   axios.get(`https://accounts.spotify.com/api/`)
  //     .then(resp => {
  //       updateApi(resp.data)
  //       console.log(resp.data)
  //     })
  // }, [])

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
        Axios.put(`/api/profile/${userId}`, { url: result.info.secure_url })
          .then((res) => setImage(res.data))
      }
    ).open()
  }

  console.log(image)

  function handleChange(event) {
    const name = event.target.name
    const value = event.target.value

    const data = {
      ...formData,
      [name]: value
    }

    updateFormData(data)
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

  function handleSubmit(event) {
    event.preventDefault()
    axios.put(`/api/profile/editprofile/${userId}`, {formData}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(resp => {
        console.log(resp.data)
        props.history.push(`/profile/${userId}`)
      })
  }

  console.log(formData)

  return <>
    <Banner />
    <main className="editSession">
      <form action="" className="edit" autoComplete="off">

        <div className="field">
          <img src={formData.image} className="editInput" />
          <button onClick={handleUpload}>Upload Image</button>
        </div>

        <div className="field">
          <label className="editLabel">First Name</label>
          <input
            className="editInput" placeholder={formData.firstname}
            type="text"
            onChange={handleChange}
            value={formData.firstname}
            name="firstname"
          />
        </div>

        <div className="field">
          <label className="editLabel">Last Name</label>
          <input
            className="editInput" placeholder={formData.lastname}
            type="text"
            onChange={handleChange}
            value={formData.lastname}
            name="lastname"
          />
        </div>

        <div className="field">
          <label className="editLabel">Email</label>
          <input
            className="editInput" placeholder={formData.email}
            type="text"
            onChange={handleChange}
            value={formData.email}
            name="email"
          />
        </div>

        <div className="field">
          <label className="editLabel">Password</label>
          <input className="editInput"
            type="password"
            onChange={handleChange}
          />
        </div >

        <div className="field">
          <label className="editLabel">Password Confirmation</label>
          <input className="editInput"
            type="password"
            onChange={handleChange}
            value={formData.passwordConfirmation}
            name="passwordConfirmation"
          />
        </div >

        <div className="field">
          <label className="editLabel">Your Song</label>
          <input className="editInput"
            type="text"
            onChange={handleChange}
            value={formData.song}
            name="email"
          />
        </div>

        {/* topFriends: '', */}

        <div className="field">
          <label className="editLabel">Your Bio</label>
          <input className="editInput" placeholder={formData.bio}
            type="text"
            onChange={handleChange}
            value={formData.bio}
            name="bio"
          />
        </div>

        <div className="field">
          <label htmlFor='private-status' className="editLabel">Private</label>
          <Toggle
            className="editInput"
            id='private-status'
            defaultChecked={formData.private}
            onChange={handleToggle}
            name="private" />
        </div>

        <button className="button" type="submit" onClick={handleSubmit}>Save Changes</button>
        {/* {!localStorage.getItem('token') && <Link to='/profile/:id' className="discrete">Login</Link>} */}
      </form>
    </main>
    <Navbar />
  </>
}

export default Edit