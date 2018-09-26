import React from 'react'
import { Redirect } from 'react-router'

export default (Component) => {
  class RequireAuth extends React.Component {
    render () {
      const loggedIn = false
      
      return loggedIn ? <Component {...this.props}/> : <Redirect to='/login' />
    }
  }

  return RequireAuth
}