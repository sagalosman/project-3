import React, {useState} from 'react'
import axios from 'axios'

const Register = (props) => {

  const [formData, updateFormData] = useState({
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
      <p></p>

      <div className="field">
        <label className="label">First Name</label>
        <input
          className="input" placeholder= " e.g Alex "
          type="text"
          onChange={handleChange}
          value={formData.firstname}
          name="firstname"
        />
      </div>
      
      <div className="field">
        <label className="label">Last Name</label>
        <input
          className="input" placeholder= " e.g Smith"
          type="text"
          onChange={handleChange}
          value={formData.last}
          name="lastname"
        />
           <div className="field">
        <label className="label">Username</label>
        <input
          className="input" placeholder= " e.g AlexSmith"
          type="text"
          onChange={handleChange}
          value={formData.username}
          name="text"
        />
      </div>
      <div className="field">
        <label className="label">Email</label>
        <input
          className="input" placeholder= " e.g Alex@Smith.com"
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
   
    <button type="submit" onClick={handleSubmit}>Sign Up</button>
    {/* <link to='/Login'>Have an account? Login</link> */}
    <a href="" class="discrete" target="_blank">Have an account? Login</a>
  </form>
</div>
}

export default Register