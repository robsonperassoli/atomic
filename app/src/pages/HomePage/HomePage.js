import React, { useState } from 'react'
import { Menu, Button } from 'semantic-ui-react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { Query, Subscription } from 'react-apollo'
import startOfWeek from 'date-fns/start_of_week'
import addDays from 'date-fns/add_days'
import format from 'date-fns/format'
import isSameDay from 'date-fns/is_same_day'
import { range } from 'ramda'
import withAppLayout  from '../../components/hocs/withAppLayout'
import TaskModal from './TaskModal'
import TaskList from './TaskList'

const getWeekDates = () => {
  const firstDayOfWeek = startOfWeek(new Date())
  return range(0, 7).map(weekDay => addDays(firstDayOfWeek, weekDay))
}

const GET_TASKS = gql`
  query GetTasks($projectId: ID!, $createdAtStart: DateTime!, $createdAtEnd: DateTime!) {
    project(id: $projectId) {
      id
      tasks(createdAtStart: $createdAtStart, createdAtEnd: $createdAtEnd) {
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

const Container = styled.div`
  margin-top: 20px;
`

const ButtonBar = styled.div`
  margin-bottom: 20px;
`

const dateFilters = date => {
  return {
    createdAtStart: `${format(date, 'YYYY-MM-DD')}T00:00:00.001Z`,
    createdAtEnd: `${format(date, 'YYYY-MM-DD')}T23:59:59.999Z`
  }
}

const HomePage = ({ selectedProjectId }) => {
  const [selectedDate, selectDate] = useState(new Date())
  const [modalVisible, setModalVisible] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  const openEditTaskModal = (task) => {
    setModalVisible(true)
    setEditingTask(task)
  }

  const openAddTaskModal = () => {
    setModalVisible(true)
    setEditingTask(null)
  }

  const projectSelected = !!selectedProjectId

  return (
    <Subscription subscription={TASK_SUBSCRIPTION}>
      {() => (
        <Query query={GET_TASKS} variables={{ projectId: selectedProjectId, ...dateFilters(selectedDate) }}>
          {({ loading, data: { project }, refetch}) => loading ? null : (
            <Container>
              {projectSelected && (
                <ButtonBar>
                  <Button
                    content='New'
                    icon='add'
                    onClick={() => openAddTaskModal(true)}
                  />
                </ButtonBar>
              )}

              <TaskModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onTaskSaved={() => refetch()}
                onTaskDeleted={() => refetch()}
                projectId={selectedProjectId}
                task={editingTask}
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

              {projectSelected && (
                <TaskList
                  tasks={project.tasks}
                  onEditTaskClicked={task => openEditTaskModal(task)}
                />
              )}
            </Container>
          )}
        </Query>
      )}
    </Subscription>
  )
}

export default withAppLayout(HomePage)
