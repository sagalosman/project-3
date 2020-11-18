import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Edit = (props) => {

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

  function handleChange(event) {
    const name = event.target.name
    const value = event.target.value

    const data = {
      ...formData,
      [name]: value
    }

    updateFormData(data)
  }

  function handleSubmit(event) {

    event.preventDefault()

    axios.post('api/profile/editProfile/:userId', formData)
      .then(resp => {
        console.log(resp.data)
        props.history.push('/profile/:userId')
      })
  }

  console.log(formData)

  return <>
  <main>
    <div className="session">
      <div className="left">


      </div>
      <form action="" className="log-in" autoComplete="off">
        <h4 className="title">We are <span>Clique</span></h4>
        <p className="welcome">Create a new account:</p>

        <div className="field">
          <label className="label">First Name</label>
          <input
            className="input" placeholder="Alex "
            type="text"
            onChange={handleChange}
            value={formData.firstname}
            name="firstname"
          />
        </div>

        <div className="field">
          <label className="label">Last Name</label>
          <input
            className="input" placeholder="Smith"
            type="text"
            onChange={handleChange}
            value={formData.last}
            name="lastname"
          />
          <div className="field">
            <label className="label">Email</label>
            <input
              className="input" placeholder="Alex@Smith.com"
              type="text"
              onChange={handleChange}
              value={formData.email}
              name="email"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <input className="input"
            type="password"
            onChange={handleChange}
          />
        </div >
        <div className="field">
          <label className="label">Password Confirmation</label>
          <input className="input"
            type="password"
            onChange={handleChange}
            value={formData.passwordConfirmation}
            name="passwordConfirmation"
          />
        </div >
        <div className="image">
          <label className="label">Profile Picture</label>
        </div>

        <div className="song">
          <label className="label">Your Song</label>
          <input className="song"
            type="text"
            onChange={handleChange}
            value={formData.song}
            name="email"
          />
        </div>
    topFriends: '',
      <div className="bio">
          <label className="label">Your Bio</label>
          <input className="label"
            type="text"
            onChange={handleChange}
            value={formData.bio}
            name="email"
          />
        </div>
    private: true

      <button className="button" type="submit" onClick={handleSubmit}>Save Changes</button>
        {/* {!localStorage.getItem('token') && <Link to='/profile/:id' className="discrete">Login</Link>} */}
      </form>
    </div>
  </main>
  {/* <Navbar /> */}
  </>
}


export default Edit