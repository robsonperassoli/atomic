import React from 'react'
import { Text } from 'grommet'
import { useQuery, gql } from '@apollo/client'

const APP_QUERY = gql`
  {
    token @client
    authenticated @client
  }
`

function Home() {
  const { data } = useQuery(APP_QUERY)
  return (
    <Text>Home</Text>
  )
}

export default Home
