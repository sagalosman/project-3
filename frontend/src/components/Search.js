import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Banner from './Banner'
import axios from 'axios'
import NavBar from './NavBar'

const Search = (props) => {

  const [getUsers, updateGetUsers] = useState([])
  const [searchUsers, updateSearchUsers] = useState('')

  useEffect(() => {
    axios.get('/api/users', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(resp => {
        updateGetUsers(resp.data)
        console.log(resp.data)
      })
  }, [])


  function filterUsers() {
    const filteredUsers = getUsers.filter(user => {
      const firstname = user.firstname.toLowerCase()
      const lastname = user.lastname.toLowerCase()
      const username = user.username.toLowerCase()
      const filterText = searchUsers.toLowerCase()

      return firstname.includes(filterText) || lastname.includes(filterText) || username.includes(filterText)
    })
    return filteredUsers
  }

  if (!getUsers[0]) {
    return <>
      <Banner />
      <main className="homepage">
        <div className="display-area">
          <h1 className="loading">Loading...</h1>
        </div>
      </main>
      {/* <NavBar /> */}
    </>
  }
  return <>
    <Banner />
    <main className="homepage">
      <div className="display-area">
        <div>
          <input type="text" className="input" placeholder="Search for a user"
            onChange={(event) => updateSearchUsers(event.target.value)}
            value={searchUsers}
          />
        </div>
        {filterUsers().map((user, index) => {
          { console.log(user) }
          return <div key={index} className="event">
            <div className="event-left">
              <img className="event-img" src={user.photo} alt="image" />
            </div>
            <Link to={`/profile/users/${user._id}`} className="event-content">
              <h4 className="event-name">{user.firstname} {user.lastname}</h4>
            </Link>
          </div>
        })}
      </div>
    </main>
    <NavBar />
  </>
}

export default Search