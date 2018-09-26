import React from 'react'
import { Redirect } from 'react-router'

export default (Component) => {
  class RequireAuth extends React.Component {
    render () {
      const loggedIn = false
      
      return loggedIn ? <Redirect to='/' /> : <Component {...this.props} />
    }
  }

  return RequireAuth
}