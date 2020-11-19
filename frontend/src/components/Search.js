import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Banner from './Banner'
import axios from 'axios'

const Search = (props) => {
  const [searchUsers, updateSearchUsers] = useState({})
  useEffect(() => {
    axios.get('/api/users', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(resp => updateSearchUsers(resp.data))
  }, [])

  console.log(searchUsers)

  // if (!searchUsers.firstname) {
  //   return <>
  //     <Banner />
  //     <main className="homepage">
  //       <div className="display-area">
  //         <h1 className="loading">Loading...</h1>
  //       </div >
  //     </main >
  //     {/* <NavBar /> */}
  //   </>
  // }

  return <>
    <Banner />
    <main>
      <h1>Hello</h1>
    </main>
  </>
}
export default Search