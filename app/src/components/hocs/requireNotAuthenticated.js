import React from 'react'
import { Redirect } from 'react-router'
import { AuthContext } from '../../contexts/AuthContext'

export default (Component) => {
  class RequireNotAuthenticated extends React.Component {
    render () {
      return (
        <AuthContext.Consumer>
          {({ loggedIn }) => loggedIn ? <Redirect to='/' /> : <Component {...this.props} />}
        </AuthContext.Consumer>
      )
    }
  }

  return RequireNotAuthenticated
}