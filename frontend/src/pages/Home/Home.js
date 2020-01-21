import React, { useState } from 'react'
import { Text, Box, Button } from 'grommet'
import { Add } from 'grommet-icons'
import { useQuery, useSubscription, gql } from '@apollo/client'
import { DateTime } from 'luxon'
import AppLayout from '../../components/AppLayout'
import Container from '../../components/Container'
import WeekSelector from '../../components/AppLayout/WeekSelector'
import useSelectedProjectId from '../../hooks/useSelectedProjectId'
import TaskList from './TaskList'
import TaskModal from './TaskModal'
import WeekDaysMenu from './WeekDaysMenu'
import Report from "./Report";

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

const TASK_SUBSCRIPTION = gql`
  subscription TaskUpdatedSubscription {
    taskUpdated {
      id
      description
      time
      timerStatus
      timerStartedAt
    }
  }
`

function NoProjectSelected() {
  return <Text>No project Selected, select the project to see the tasks</Text>
}

const weekDates = (date) => {
  const weekStart = date.startOf('week').startOf('day')
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
  const { data: _subscription } = useSubscription(TASK_SUBSCRIPTION)

  const dates = weekDates(selectedDate)
  return (
    <AppLayout>
      <Container>
        <Box direction='row' justify='between' align='center' margin={{ top: 'medium' }}>
          <Box direction='row' gap='10px'>
            <Button
              icon={<Add />}
              label='New Task'
              onClick={() => setTaskModal({ visible: true, props: {} })}
            />
            <Report />
          </Box>
          <WeekSelector
            date={selectedDate}
            onDateChanged={date => setSelectedDate(date)}
          />
        </Box>
        <WeekDaysMenu
          dates={dates}
          onDateSelected={date => setSelectedDate(date)}
          selectedDate={selectedDate}
        />
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
