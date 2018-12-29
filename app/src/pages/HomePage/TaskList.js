import React from 'react'
import { Button, Icon, Segment } from 'semantic-ui-react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import formatDuration from 'format-duration'

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
  align-items: center;
`

const TaskDescription = styled.div`
  flex: 10;
`

const TaskTime = styled.div`
  flex: 1;
  text-align: right;
  font-size: 1.2em;
  font-weight: 600;
  color: #656565;
`

const TaskActions = styled.div`
  flex: 2;
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
        <TaskTime>{formatDuration(task.time * 1000)}</TaskTime>
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
