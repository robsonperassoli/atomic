import React from 'react'
import { Button, Icon, Segment } from 'semantic-ui-react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'

const STOP_TASK = gql`
  mutation StopTask($taskId: ID!) {
    stopTask(taskId: $taskId) {
      id
      timerStatus
      time
    }
  }
`

const START_TASK = gql`
  mutation StartTask($taskId: ID!) {
    startTask(taskId: $taskId) {
      id
      timerStatus
      time
    }
  }
`

const TaskItem = styled.div`
  display: flex;
`

const TaskDescription = styled.div`
  flex-grow: 10;
`

const TaskActions = styled.div`
  flex-grow: 2;
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
`

const EditIcon = styled.div`
  cursor: pointer;
  margin-left: 10px;
  font-size: 1.1em;
`

const TaskList = ({ tasks = [], startTaskMutation, stopTaskMutation }) =>
  tasks.map(task => (
    <Segment key={task.id} attached>
      <TaskItem>
        <TaskDescription>{task.description}</TaskDescription>
        <TaskActions>
          {task.timerStatus === 'running' && (
            <Button
              icon='clock outline'
              content='Stop'
              labelPosition='left'
              onClick={() => stopTaskMutation({ variables: { taskId: task.id } })}
            />
          )}
          {task.timerStatus === 'stopped' && (
            <Button
              content='Start'
              color='blue'
              onClick={() => startTaskMutation({ variables: { taskId: task.id } })}
            />
          )}
          <EditIcon onClick={() => console.log('clicked!!')}>
            <Icon name='pencil' />
          </EditIcon>
        </TaskActions>
      </TaskItem>
    </Segment>
  ))

export default compose(
  graphql(START_TASK, { name: 'startTaskMutation' }),
  graphql(STOP_TASK, { name: 'stopTaskMutation' })
)(TaskList)
