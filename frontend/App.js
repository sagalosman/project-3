import React, {useState} from 'react'
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './styles/style.scss'


// For environment varibles
console.log(process.env.hello)

const App = () => {
  const [image, setImage] = useState('')

  function handleUpload() {
    window.cloudinary.createUploadWidget(
      {
        cloudName: 'dky2sqc0z', 
        uploadPreset: 'clique1', 
        cropping: true
      },
      (err, result) => {
        if (result.event !== 'success'){
          return
        }
        Axios.put('/api/image/alis_test_image', { url: result.info.secure_url })
          .then((res) => setImage(res.data))
      }
    ).open()
  }

  console.log(image)
  return <>
  <img src={image.url}/>
    <button onClick={handleUpload}
    >Upload Image
    </button>
  </>

}
import Register from './components/register'
import Login from './components/login'

// For environment varibles
console.log(process.env.hello)

const App = () => (
  <BrowserRouter>
  <Navbar />
    <Switch>
      {/* <Route exact path="/" component={Home}/> */}
      <Route exact path="/register" component={Register}/>
      <Route exact path="/login" component={Login}/>
    </Switch>
  </BrowserRouter>
)

// const App = () => {
//   return <h1>Hello friends</h1>
// }


export default App