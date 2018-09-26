import React from 'react'
import { Redirect } from 'react-router'
import { AuthContext } from '../../contexts/AuthContext'

export default (Component) => {
  class RequireAuth extends React.Component {
    render () {
      return (
        <AuthContext.Consumer>
          {({ loggedIn }) => loggedIn ? <Component {...this.props}/> : <Redirect to='/login' />}
        </AuthContext.Consumer>
      ) 
    }
  }

  return RequireAuth
}