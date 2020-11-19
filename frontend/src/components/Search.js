import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
<<<<<<< HEAD
import NavBar from './NavBar'
=======
>>>>>>> 77ef4c12c9307adf2f9361305231f52cb34f5c83
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
      .then(resp =>  {
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
          {console.log(user)}
          return <div key={index} className="event">
            <div className="event-left">
              <img className="event-img" src={user.photo} alt="image" />
            </div>
            <Link to={`/profile/users/${user._id}`}  className="event-content">
              <h4 className="event-name">{user.firstname} {user.lastname}</h4>
            </Link>
          </div>
        })}
      </div>
<<<<<<< HEAD
      
   <div className="search__container">
    <p className="search__title">
        Go ahead, hover over search
    </p>
      <input
        className="search__input"
        type="text" 
        placeholder="Search"
        onChange={(event) => updateSearchFilter(event.target.value)}
        value={searchFilter}
      />
       </div>
       
      


      {/* <div className="dropdown">
      <select
        className="select"
        value={selectedName}
        onChange={(event) => updateSelectedName(event.target.value)}
      >
        <option className="option" disabled selected>
          What are you looking for? 
         </option>
         <option className="option" value="events">
          Events
         </option>
         <option className="option" value="users">
          Users 
         </option>
        
      </select>
    </div> */}
    
    </>
    
  

}

export default Searchs


// import React, { useState, useEffect } from 'react'
// import Banner from './Banner'
// // import { Link } from 'react-router-dom'

// import axios from 'axios'

// const Searchs = () => {
//   const [searchs, updateSearchs] = useState([])
//   const [searchFilter, updateSearchFilter] = useState('')
//   const [selectedName, updateSelectedName] = useState('')

//   useEffect(() => {
//     axios.get('/api/users')
//       .then(resp => {
//         console.log(resp.data)
//         updateSearchs(resp.data)
//       })
//   }, [])
// console.log(searchs)
//   useEffect(() => {
//     axios.get('api/events')
//       .then(resp => {
//         console.log(resp.data)
//         updateEvents(resp.data)
//       })
//   }, [])
//   console.log(searchs)
//   function getNames() {
//     const mappedSearchs = searchs.map(search => search.firstname)
//     console.log(mappedSearchs)
//     return mappedSearchs
//   }
//   function filteredSearchs() {
//     const filteredSearchs = searchs.filter(search => {
//       return (selectedName === '' || search.firstname === selectedName)
//     })
//     return filteredSearchs
//   }

//   return <>
//   <Banner />

//    <div className="sectionbox">
//     <div className="search-box">
//       <input
//         className="input"
//         placeholder="Search..."
//         onChange={(event) => updateSearchFilter(event.target.value)}
//         value={searchFilter}
//       />
      
//       <div className="buttons">
//         {getNames().map(users => {
//           return <button
//           type='text'
//             onClick={(event) => updateSelectedName(event.target.innerHTML) }
//             className="button">
//             {users}
//           </button>
//         })}
//       </div>
     
//       </div>
//     </div>
//   </>
// }

// export default Searchs
=======
    </main>
    <NavBar />
  </>
}

export default Search
>>>>>>> 77ef4c12c9307adf2f9361305231f52cb34f5c83
