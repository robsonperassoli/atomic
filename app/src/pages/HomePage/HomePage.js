import React, { useState } from 'react'
import { Segment, Menu, Button } from 'semantic-ui-react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import startOfWeek from 'date-fns/start_of_week'
import addDays from 'date-fns/add_days'
import format from 'date-fns/format'
import isSameDay from 'date-fns/is_same_day'
import { range } from 'ramda'
import withAppLayout  from '../../components/hocs/withAppLayout'
import AddTaskModal from './AddTaskModal'
import TaskList from "./TaskList";

const getWeekDates = () => {
  const firstDayOfWeek = startOfWeek(new Date())
  return range(0, 7).map(weekDay => addDays(firstDayOfWeek, weekDay))
}

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

const ButtonBar = styled.div`
  margin-bottom: 20px;
`



const HomePage = ({ selectedProjectId }) => {
  const [selectedDate, selectDate] = useState(new Date())
  const [modalVisible, setModalVisible] = useState(false)
  return (
    <Query query={GET_TASKS} variables={{ projectId: selectedProjectId }}>
      {({ loading, data: { project }, refetch}) => loading ? null : (
        <Container>
          <ButtonBar>
            <Button
              content='New'
              icon='add'
              onClick={() => setModalVisible(true)}
            />
          </ButtonBar>

          <AddTaskModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onTaskSaved={() => refetch()}
            projectId={selectedProjectId}
          />

          <Menu attached='top' widths={7} size='huge'>
            {getWeekDates().map(date => (
              <Menu.Item
                key={date.toString()}
                name={date.toString()}
                active={isSameDay(date, selectedDate)}
                onClick={() => selectDate(date)}
              >
                {format(date, 'ddd')}
              </Menu.Item>
            ))}
          </Menu>

          <TaskList
            tasks={project.tasks}
          />

          <Segment attached='bottom'>3:20</Segment>
        </Container>
      )}
    </Query>
  )
}

export default withAppLayout(HomePage)
