import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { Box } from 'grommet'

const TASKS_QUERY = gql`
  query TasksQuery($projectId: ID!, $createdAtStart: DateTime!, $createdAtEnd: DateTime!) {
    project(id: $projectId) {
      id
      name
      tasks (createdAtStart: $createdAtStart, createdAtEnd: $createdAtEnd) {
        id
        description
      }
    }
  }
`


function TaskList({ projectId, date }) {
  const { data, loading } = useQuery(TASKS_QUERY, {
    variables: { projectId, createdAtStart: date.startOf('day').toUTC(), createdAtEnd: date.endOf('day').toUTC() }
  })

  if (loading) {
    return 'Loading'
  }

  const { project } = data

  if (!loading && project.tasks.length === 0) {
    return (<Box pad='medium' align='center'>Task list is empty :)</Box>)
  }

  return (
    <Box>
      {project.tasks.map(task => (
        <Box key={task.id}>{task.description}</Box>
      ))}
    </Box>
  )
}

export default TaskList
