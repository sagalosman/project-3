import React, { useState, useEffect } from 'react'
import Toggle from 'react-toggle'
import axios from 'axios'
// import { Link } from 'react-router-dom'
// import Navbar from './Navbar'
const Edit = (props) => {
  const userId = '5fb2a1866e8d4ab75cc8692c'
  const [userForm, updateUserForm] = useState({})
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
    axios.get(`/api/profile/${userId}`)
      .then(resp => {
        updateUserForm(resp.data)
        console.log(resp.data)
      })
  }, [])


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
    axios.post(`api/profile/editProfile/${userId}`, formData)
      .then(resp => {
        console.log(resp.data)
        props.history.push(`/profile/${userId}`)
      })
  }

  console.log(formData)

  return <div className="editSession">
    {/* <main> */}
    <form action="" className="edit" autoComplete="off">
      <div className="field">
        <label className="editLabel">First Name</label>
        <input
          className="editInput" placeholder="Alex"
          type="text"
          onChange={handleChange}
          value={formData.firstname}
          name="firstname"
        />
      </div>

      <div className="field">
        <label className="editLabel">Last Name</label>
        <input
          className="editInput" placeholder="Smith"
          type="text"
          onChange={handleChange}
          value={formData.last}
          name="lastname"
        />
        <div className="field">
          <label className="editLabel">Email</label>
          <input
            className="editInput" placeholder="Alex@Smith.com"
            type="text"
            onChange={handleChange}
            value={formData.email}
            name="email"
          />
        </div>
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
      <div className="image">
        <label className="editLabel">Profile Picture</label>
      </div>
      <div className="song">
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
        <input className="editInput"
          type="text"
          onChange={handleChange}
          value={formData.bio}
          name="bio"
        />
      </div>
      <Toggle
        id='private-status'
        defaultChecked={true}
        onChange={handleToggle}
        name="private"/>
      <label htmlFor='private-status' className="editLabel">Private</label>
      <button className="button" type="submit" onClick={handleSubmit}>Save Changes</button>
      {/* {!localStorage.getItem('token') && <Link to='/profile/:id' className="discrete">Login</Link>} */}
    </form>
  </div>
  {/* </main> */ }
  {/* <Navbar /> */ }
}

export default Edit