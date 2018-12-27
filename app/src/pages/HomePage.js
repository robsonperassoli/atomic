import React from 'react'
import { Segment, Menu } from 'semantic-ui-react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import withAppLayout  from '../components/hocs/withAppLayout'

const GET_TASKS = gql`
  query GetTasks($projectId: ID!) {
    project(id: $projectId) {
      id
      tasks {
        id
        description
        time
        timerStatus
        timerStartedAt
        timerStoppedAt
        tags
      }
    }
  }
`

const Container = styled.div`
  margin-top: 20px;
`

const HomePage = ({ selectedProjectId }) => (
  <Query query={GET_TASKS} variables={{ projectId: selectedProjectId }}>
    {({ loading, data: { project }}) => loading ? null : (
      <Container>
        <Menu attached='top' widths={7} size='huge'>
          <Menu.Item name='sunday' active={false} onClick={() => null}>Sun</Menu.Item>
          <Menu.Item name='monday' active={false} onClick={() => null}>Mon</Menu.Item>
          <Menu.Item name='tuesday' active={false} onClick={() => null}>Tue</Menu.Item>
          <Menu.Item name='wednesday' active onClick={() => null}>Wed</Menu.Item>
          <Menu.Item name='thursday' active={false} onClick={() => null}>Thu</Menu.Item>
          <Menu.Item name='friday' active={false} onClick={() => null}>Fri</Menu.Item>
          <Menu.Item name='saturday' active={false} onClick={() => null}>Sat</Menu.Item>
        </Menu>

        {project.tasks.map(task => (
          <Segment key={task.id} attached>
            {task.description}
          </Segment>
        ))}

        <Segment attached='bottom'>3:20</Segment>
      </Container>
    )}
  </Query>
)

export default withAppLayout(HomePage)
