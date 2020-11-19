import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import NavBar from './NavBar'
import Banner from './Banner'
import axios from 'axios'

const Searchs = () => {
  const [searchs, updateSearchs] = useState([])
  const [searchFilter, updateSearchFilter] = useState('')
  const [selectedName, updateSelectedName] = useState('')

  useEffect(() => {
    axios.get('/api/users')
      .then(resp => {
        console.log(resp.data)
        updateSearchs(resp.data)
      })
  }, [])

  useEffect(() => {
    axios.get('api/events')
      .then(resp => {
        console.log(resp.data)
        updateEvents(resp.data)
      })
  }, [])


  function getNames() {
    const mappedSearchs = searchs.map(search => search.firstname)
    console.log(mappedSearchs)
   
    return mappedSearchs
    
  }

  function filteredSearchs() {
    const filteredSearchs = searchs.filter(search => {
      return (selectedName === '' || search.firstname === selectedName)
    })
    return filteredSearchs
  }

  <div className="buttons">
        {getNames().map(name => {
          return <button
            onClick={(event) => updateSelectedName(event.target.innerHTML) }
            className="button"
          >
            {name}
          </button>
        })}
      </div>

  return <>
  <Banner />
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
      


      <div className="dropdown">
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
    </div>
      <div className="columns">
        {filteredSearchs().map((search, index) => {
          console.log(searchs)
          return <div
            className="column2"
            key={index}
          >
            {/* <p className="subtitle is-4">
                      {search.firstname}
                    </p> */}
          </div>
        })}
      </div >
    </div>
    
<NavBar />
   </>

      }

export default Searchs


// import React, { useState, useEffect } from 'react'
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
//     const uniqueSearchs = new Set(mappedSearchs)
//     return mappedSearchs
//     console.log(arraySearchs)
//     return arraySearchs
//   }
//   function filteredSearchs() {
//     const filteredSearchs = searchs.filter(search => {
//       return (selectedName === '' || search.firstname === selectedName)
//     })
//     return filteredSearchs
//   }

//   return <div className="sectionbox">
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
//             onClick={(event) => updateSelectedName(event.target.innerHTML) }
//             className="button">
//             {users}
//           </button>
//         })}
//       </div>
//      
//       </div>
//     </div>
//   </div>
// }

// export default Searchs