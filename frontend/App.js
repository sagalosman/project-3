import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './styles/style.scss'

import Register from './src/components/Register'
import Login from './src/components/Login'
import ProtectedRoute from './src/components/ProtectedRoute'
import ViewProfile from './src/components/ViewProfile'
import HomePage from './src/components/HomePage'
import EditProfile from './src/components/EditProfile'
import Search from './src/components/Search'
import EventPage from './src/components/EventPage'
import AddEvent from './src/components/AddEvent'

const App = () => {
  return <BrowserRouter>
    <Switch>
      <Route exact path="/register" component={Register} />
      <ProtectedRoute exact path="/profile/users/:userId" component={ViewProfile} />
      <ProtectedRoute exact path="/editprofile/:userId" component={EditProfile}/>
      <Route exact path="/" component={Login} />
      <ProtectedRoute exact path="/search" component={Search} />
      <ProtectedRoute exact path="/home" component={HomePage} />
      <ProtectedRoute exact path="/events/addevent" component={AddEvent} />
      <ProtectedRoute exact path="/events/:eventId" component={EventPage} />
      
    </Switch>
  </BrowserRouter>
}

export default App