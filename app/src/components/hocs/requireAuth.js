import React from 'react'
import { Redirect } from 'react-router'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const AUTH_QUERY = gql`
  {
    auth @client {
      loggedIn
    }
  }
`

export default (Component) => {
  class RequireAuth extends React.Component {
    render () {
      return (
        <Query query={AUTH_QUERY}>
          {({ data: { auth } }) => {
            return auth.loggedIn ? <Component {...this.props}/> : <Redirect to='/login' />
          }}
        </Query>
      )
    }
  }

  return RequireAuth
}
