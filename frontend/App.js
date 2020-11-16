import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './styles/style.scss'


<<<<<<< HEAD
import Register from './src/components/Register'
import Login from './src/components/Login'
import Profile from './src/components/Profile'
// For environment varibles
=======
import Register from './src/components/register'
import Login from './src/components/login'

>>>>>>> 2101a99f542a054f6389829e4923254e0d809398
console.log(process.env.hello)

const App = () => {
  return <BrowserRouter>
    <Switch>
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/profile" component={Profile} />
    </Switch>
  </BrowserRouter>
}

//  const [image, setImage] = useState('')

//   function handleUpload() {
//     window.cloudinary.createUploadWidget(
//       {
//         cloudName: 'dky2sqc0z',
//         uploadPreset: 'clique1',
//         cropping: true
//       },
//       (err, result) => {
//         if (result.event !== 'success') {
//           return
//         }
//         Axios.put('/api/image/alis_test_image', { url: result.info.secure_url })
//           .then((res) => setImage(res.data))
//       }
//     ).open()
//   }

//   console.log(image)
//   return <>
//   <img src={image.url}/>
//     <button onClick={handleUpload}
//     >Upload Image
//     </button>
//   </>
export default App