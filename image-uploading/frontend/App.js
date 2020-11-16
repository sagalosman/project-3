import Axios from 'axios'
import React, { useState } from 'react'

import './styles/style.scss'


const App = () => {
  
  const [image, setImage] = useState('')

  function handleUpload() {
    window.cloudinary.createUploadWidget(
      {
        cloudName: 'dbfud6pz0', //!this will be your cloud name
        uploadPreset: 'testing', //!this will be your upload presets
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

export default App