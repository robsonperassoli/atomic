import React from 'react'
import { AppLayout } from '../../layouts'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const SELECTED_PROJECT = gql`
  {
    selectedProjectId @client
  }
`

export default (Component) => {
  class WithAppLayout extends React.Component {
    render () {
      return (
        <Query query={SELECTED_PROJECT}>
          {({ data: { selectedProjectId } }) => (
            <AppLayout>
              <Component selectedProjectId={selectedProjectId} {...this.props} />
            </AppLayout>
          )}
        </Query>
      )
    }
  }

  return WithAppLayout
}
