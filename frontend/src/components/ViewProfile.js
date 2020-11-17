import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import NavBar from './NavBar'

const ViewProfile = (props) => {

  const [viewProfile, updateViewProfile] = useState([])
  console.log(props)
  useEffect(() => {
    axios.get(`/api/users`)
      .then(resp => {
        updateViewProfile(resp.data)
        console.log(viewProfile)
      })
  }, [])

  return <div className="section">
    <h1>hello</h1>
  </div>
}


export default ViewProfile