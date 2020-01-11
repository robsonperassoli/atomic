import React, { useState } from 'react'
import { Text, Box } from 'grommet'
import { useQuery, gql } from '@apollo/client'
import { DateTime } from 'luxon'
import AppLayout from '../../components/AppLayout'
import useSelectedProjectId from '../../hooks/useSelectedProjectId'
import TaskList from './TaskList'

const PROJECTS = gql`
  {
    me {
      email
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
  const { data } = useQuery(PROJECTS)
  const selectedProjectId =  useSelectedProjectId()

  const dates = weekDates()
  return (
    <AppLayout>
      <Box direction='row'>
        {dates.map(date => (
          <Text key={date.toISO()} onClick={() => setSelectedDate(date)}>{date.toFormat('EEE')}</Text>
        ))}
      </Box>
      {selectedProjectId ? (
        <TaskList projectId={selectedProjectId} date={selectedDate} />
      ) : (
        <NoProjectSelected />
      )}
    </AppLayout>
  )
}

export default Home
