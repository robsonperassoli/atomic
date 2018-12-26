import React, { Fragment } from 'react'
import { Container } from 'semantic-ui-react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Header from './Header'

const GET_APP_DATA = gql`
  query AppDataQuery {
    projects {
      id
      name
    }
  }
`

const AppLayout = ({ children }) => (
  <Container>
    <Query query={GET_APP_DATA}>
      {({ loading, error, data }) => loading ? null : (
        <Fragment>
          <Header projects={data.projects} />
          {children}
        </Fragment>
      )}
    </Query>
  </Container>
)



export default AppLayout
