import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { Redirect } from 'react-router-dom'

const AUTH_QUERY = gql`
  {
    authenticated @client
  }
`

function requireNotAuth(Component) {
  function RequireNotAuth(props) {
    const { data, loading } = useQuery(AUTH_QUERY)

    if (loading) {
      return null
    }

    const { authenticated } = data
    return authenticated ? <Redirect to='/' /> : <Component {...props} />
  }

  return RequireNotAuth
}

export default requireNotAuth
