import React, { useState } from 'react'
import { Text, Box, Button } from 'grommet'
import { Add } from 'grommet-icons'
import { useQuery, gql } from '@apollo/client'
import { DateTime } from 'luxon'
import AppLayout from '../../components/AppLayout'
import Container from '../../components/Container'
import useSelectedProjectId from '../../hooks/useSelectedProjectId'
import TaskList from './TaskList'
import TaskModal from './TaskModal'

const TASKS_QUERY = gql`
  query TasksQuery($projectId: ID!, $createdAtStart: DateTime!, $createdAtEnd: DateTime!) {
    project(id: $projectId) {
      id
      name
      tasks (createdAtStart: $createdAtStart, createdAtEnd: $createdAtEnd) {
        id
        description
        timerStatus
        time
        timerStartedAt
      }
    }
  }
`

function NoProjectSelected() {
  return <Text>No project Selected, select the project to see the tasks</Text>
}

const weekDates = () => {
  const weekStart = DateTime.local().startOf('week').startOf('day')
  return new Array(7).fill(1)
    .map((_v, i) => weekStart.plus({ days: i }))
}


function Home() {
  const [selectedDate, setSelectedDate] = useState(DateTime.local().startOf('day'))
  const [taskModal, setTaskModal] = useState({ visible: false, props: {} })
  const projectId =  useSelectedProjectId()
  const { data, refetch } = useQuery(TASKS_QUERY, {
    skip: !projectId,
    fetchPolicy: 'cache-and-network',
    variables: {
      projectId,
      createdAtStart: selectedDate.startOf('day').toUTC(),
      createdAtEnd: selectedDate.endOf('day').toUTC()
    }
  })

  const dates = weekDates()
  return (
    <AppLayout>
      <Container>
        <Button
          icon={<Add />}
          label='New Task'
          alignSelf='start'
          margin={{ top: 'medium' }}
          onClick={() => setTaskModal({ visible: true, props: {} })}
        />
        <Box
          direction='row'
          fill='horizontal'
          justify='between'
          border='all'
          round='xsmall'
          margin={{ vertical: 'small' }}
        >
          {dates.map((date, i) => (
            <Box
              pad='small'
              border={i !== dates.length - 1 ? 'right' : null}
              fill
              align='center'
              onClick={() => setSelectedDate(date)}
              background={date.hasSame(selectedDate, 'day') ? 'light-2' : null}
              round={{
                size: 'xsmall',
                corner: 'right'
              }}
              key={date.toISO()}
            >
              {date.toFormat('EEE')}
            </Box>
          ))}
        </Box>
        {projectId ? (
          <TaskList
            tasks={data ? data.project.tasks : []}
            onTaskEdit={task => setTaskModal({ visible: true, props: { task } })}
          />
        ) : (
          <NoProjectSelected />
        )}
      </Container>
      {taskModal.visible && (
        <TaskModal
          onClose={() => setTaskModal({ visible: false, props: {} })}
          onTaskSaved={() => refetch()}
          onTaskDeleted={() => refetch()}
          {...taskModal.props}
        />
      )}
    </AppLayout>
  )
}

export default Home