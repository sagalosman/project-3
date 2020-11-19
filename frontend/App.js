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

const App = () => {
  return <BrowserRouter>
    <Switch>
      <Route exact path="/register" component={Register} />
      <ProtectedRoute exact path="/profile/users/:userId" component={ViewProfile} />
      <ProtectedRoute exact path="/editprofile/:userId" component={EditProfile}/>
      <Route exact path="/" component={Login} />
      <Route exact path="/search" component={Search} />
    </Switch>
  </BrowserRouter>
}

export default App