import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { Redirect } from 'react-router-dom'

const AUTH_QUERY = gql`
  {
    authenticated @client
  }
`

function requireAuth(Component) {
  function RequireAuth(props) {
    const { data, loading } = useQuery(AUTH_QUERY)

    if (loading) {
      return null
    }

    const { authenticated } = data
    return authenticated ? <Component {...props} /> : <Redirect to='/login' />
  }

  return RequireAuth
}

export default requireAuth
