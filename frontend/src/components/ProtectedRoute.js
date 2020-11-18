import React from 'react'
import { Redirect, render } from 'react-router-dom'
// import { render } from 'sass'

class ProtectedRoute extends React.Component {

  render() {
    const Component = this.props.component
    const isAuthenticated = localStorage.getItem('token')

    return isAuthenticated ? (<Component {...this.props} />) : (<Redirect to={{ pathname: '/' }} />)
  }
}

export default ProtectedRoute