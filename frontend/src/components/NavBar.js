import React from 'react'
import { Link } from 'react-router-dom'


const NavBar = () => {
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
      <Link className="navbar-link" to="/add-event">
        <div className="navbar-add"></div>
      </Link>
    </div>
    <p className="navbar-seperator">|</p>
    <div className="navbar-section">
      <Link className="navbar-link" to="/profile">
        <div className="navbar-profile"></div>
      </Link>
    </div>
  </footer>
}

export default NavBar