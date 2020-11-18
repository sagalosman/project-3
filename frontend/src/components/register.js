import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Register = (props) => {

  const [formData, updateFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
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

    axios.post('api/register', formData)
      .then(resp => {
        props.history.push('/')
      })
  }

  return <div className="session">
    <div className="left">
    </div>
    <form action="" className="log-in" autoComplete="off">
      <h4 className="title">We are <span>Clique</span></h4>
      <p className="welcome">Create a new account:</p>

      <div className="field">
        <label className="label">First Name</label>
        <input
          className="input" 
          type="text"
          onChange={handleChange}
          value={formData.firstname}
          name="firstname"
        />
      </div>

      <div className="field">
        <label className="label">Last Name</label>
        <input
          className="input"
          type="text"
          onChange={handleChange}
          value={formData.last}
          name="lastname"
        />
      </div>

      <div className="field">
        <label className="label">Username</label>
        <input
          className="input"
          type="text"
          onChange={handleChange}
          value={formData.username}
          name="username"
        />
      </div>
      <div className="field">
        <label className="label">Email</label>
        <input
          className="input"
          type="text"
          onChange={handleChange}
          value={formData.email}
          name="email"
        />
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

      <button className="button" type="submit" onClick={handleSubmit}>Sign Up</button>
      {<Link to='/' className="discrete">Have an account? Login</Link>}
    </form>
  </div>
}

export default Register