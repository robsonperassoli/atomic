import React from 'react'
import { Text } from 'grommet'
import { useQuery, gql } from '@apollo/client'

const PROJECTS = gql`
  {
    me {
      email
    }
  }
`

function Home() {
  const { data } = useQuery(PROJECTS)
  console.log(data)
  return (
    <Text>Home</Text>
  )
}

export default Home
