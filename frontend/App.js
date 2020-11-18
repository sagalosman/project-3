import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './styles/style.scss'

import Register from './src/components/Register'
import Login from './src/components/Login'
import Profile from './src/components/Profile'
import ProtectedRoute from './src/components/ProtectedRoute'
import HomePage from './src/components/HomePage'
import EditProfile from './src/components/EditProfile'

const App = () => {
  return <BrowserRouter>
    <Switch>
      <Route exact path="/register" component={Register} />
      <ProtectedRoute exact path="/profile" component={Profile} />
      {/* <ProtectedRoute exact path="/EditProfile" component={EditProfile}/> */}
      <Route exact path="/EditProfile/:userId" component={EditProfile}/>
      <Route exact path="/" component={Login} />
      <ProtectedRoute exact path="/home" component={HomePage} />
    </Switch>
  </BrowserRouter>
}

export default App