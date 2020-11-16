import React, { useState } from 'react'
import axios from 'axios'

const Login = (props) => {

  const [formData, updateFormData] = useState({
    username: '',
    email: '',
    password: '',
    // passwordConfirmation: ''
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
        console.log(resp.data)


        props.history.push('/login')

      })
  }

  console.log(formData)


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
        // value={formData.passwordConfirmation}
        // name="passwordConfirmation"
      />
    </div >
   
    <button type="submit" onClick={handleSubmit}>Log in</button>
    {/* <Link to='/Login'>Sign Up</link> */}
    <a href="" className="discrete" target="_blank">Sign Up</a>
  </form>
</div>
}

export default Login