import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './styles/style.scss'

import Register from './src/components/Register'
import Login from './src/components/Login'
import Profile from './src/components/Profile'
import ProtectedRoute from './src/components/ProtectedRoute'
import ViewProfile from './src/components/ViewProfile'
import HomePage from './src/components/HomePage'
import EditProfile from './src/components/EditProfile'
import EventPage from './src/components/EventPage'

const App = () => {
  return <BrowserRouter>
    <Switch>
      <Route exact path="/register" component={Register} />
      <ProtectedRoute exact path="/profile/:userId" component={ViewProfile} />
      <ProtectedRoute exact path="/profile" component={Profile} />
      <ProtectedRoute exact path="/editprofile/:userId" component={EditProfile}/>
      <Route exact path="/" component={Login} />
      <ProtectedRoute exact path="/home" component={HomePage} />
      <ProtectedRoute exact path="/events/:eventId" component={EventPage} />
    </Switch>
  </BrowserRouter>
}

export default App