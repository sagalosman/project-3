import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './styles/style.scss'


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