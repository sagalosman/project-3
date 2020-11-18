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
//       <div className="columns is-multiline is-mobile">
//       </div>
//     </div>
//   </div>
// }

// export default Searchs