import React from 'react'
import { Link } from 'react-router-dom'
import { getUserId } from '../lib/UserToken'


const NavBar = () => {
  const token = localStorage.getItem('token')
  const userId = getUserId(token)

  return <footer className="navbar">
    <div className="navbar-section">
      <Link className="navbar-link" to="/home">
        <div className="navbar-home"></div>
      </Link>
    </div>
    <p className="navbar-seperator">|</p>
    <div className="navbar-section">
      <Link className="navbar-link" to="/search">
        <div className="navbar-search"></div>
      </Link>
    </div>
    <p className="navbar-seperator">|</p>
    <div className="navbar-section">
      <Link className="navbar-link" to="/events/addevent">
        <div className="navbar-add"></div>
      </Link>
    </div>
    <p className="navbar-seperator">|</p>
    <div className="navbar-section">
      <Link className="navbar-link" to={`/profile/users/${userId}`}>
        <div className="navbar-profile"></div>
      </Link>
    </div>
  </footer>
}

export default NavBar