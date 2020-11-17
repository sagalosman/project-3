import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Login = (props) => {

  const [formData, updateFormData] = useState({
    email: '',
    password: ''
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

    axios.post('/api/login', formData)
      .then(resp => {
        localStorage.setItem('token', resp.data.token)
        props.history.push('/profile')
      })
  }

  return <div className="session">
    <div className="left">
    </div>
    <form action="" className="log-in" autoComplete="off">
      <h4>We are <span>Clique</span></h4>
      <p>Welcome back! Log in to your account:</p>
      <div className="field">
        <label className="label">Email</label>
        <input
          className="input" placeholder=" e.g Alex Smith"
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
          value={formData.password}
          name="password"
        />
      </div >

      <button type="submit" onClick={handleSubmit}>Log in</button>
      <Link to="/register" className="discrete">Sign Up</Link>
    </form>
  </div>
}

export default Login