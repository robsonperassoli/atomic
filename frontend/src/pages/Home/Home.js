import React, { useState } from 'react'
import { Text, Box, Tabs, Tab } from 'grommet'
import { useQuery, gql } from '@apollo/client'
import { DateTime } from 'luxon'
import AppLayout from '../../components/AppLayout'
import Container from '../../components/Container'
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
      <Container>
        <Box
          direction='row'
          fill='horizontal'
          justify='between'
          border='all'
          round='xsmall'
          margin={{ vertical: 'medium' }}
        >
          {dates.map((date, i) => (
            <Box
              pad='small'
              border={i !== dates.length - 1 ? 'right' : null}
              fill
              align='center'
              onClick={() => setSelectedDate(date)}
              background={date.hasSame(selectedDate, 'day') ? 'light-2' : null}
              key={date.toISO()}
            >
              {date.toFormat('EEE')}
            </Box>
          ))}
        </Box>
        {selectedProjectId ? (
          <TaskList projectId={selectedProjectId} date={selectedDate} />
        ) : (
          <NoProjectSelected />
        )}
      </Container>
    </AppLayout>
  )
}

export default Home
