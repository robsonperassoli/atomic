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
  class RequireNotAuthenticated extends React.Component {
    render () {
      return (
        <Query query={AUTH_QUERY}>
          {({ data: { auth } }) => {
            return auth.loggedIn ? <Redirect to='/' /> : <Component {...this.props} />
          }}
        </Query>
      )
    }
  }

  return RequireNotAuthenticated
}
