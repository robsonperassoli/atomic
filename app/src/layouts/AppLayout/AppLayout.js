import React, { Fragment } from 'react'
import { Container } from 'semantic-ui-react'
import gql from 'graphql-tag'
import { graphql, Query } from 'react-apollo'
import Header from './Header'

const GET_APP_DATA = gql`
  query AppDataQuery {
    selectedProjectId @client
    projects {
      id
      name
    }
  }
`

const SELECT_PROJECT = gql`
  mutation ($projectId: ID!) {
    selectProject(projectId: $projectId) @client
  }
`

const AppLayout = ({ children, selectProject }) => (
  <Container>
    <Query query={GET_APP_DATA}>
      {({ loading, error, data, refetch }) => loading ? null : (
        <Fragment>
          <Header
            projects={data.projects}
            selectedProjectId={data.selectedProjectId}
            onProjectSelected={projectId => selectProject({ variables: { projectId } })}
            onProjectCreated={() => refetch()}
          />
          {children}
        </Fragment>
      )}
    </Query>
  </Container>
)

const AppLayoutWithMutation = graphql(SELECT_PROJECT, { name: 'selectProject' })(AppLayout)

export default AppLayoutWithMutation
