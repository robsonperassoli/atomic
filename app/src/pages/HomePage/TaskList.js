import React, { Fragment } from 'react'
import { Button, Icon, Segment } from 'semantic-ui-react'
import Timer from './Timer'
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
      timerStartedAt
    }
  }
`

const START_TASK = gql`
  mutation StartTask($taskId: ID!) {
    startTask(taskId: $taskId) {
      id
      timerStatus
      time
      timerStartedAt
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

const TotalTime = styled.div`
  text-align: right;
  font-weight: bold;
  font-size: 1.4rem;
`

const TaskList = ({ tasks = [], startTaskMutation, stopTaskMutation, onEditTaskClicked }) => {
  const totalTime = tasks.reduce((sum, task) => sum + task.time, 0)
  const isRunning = ({ timerStatus }) => timerStatus === 'running'
  return (
    <Fragment>
      {tasks.map(task => (
        <Segment key={task.id} attached>
          <TaskItem>
            <TaskDescription>{task.description}</TaskDescription>
            <Timer task={task} />
            <TaskActions>
              {isRunning(task) && (
                <Button
                  icon='clock outline'
                  content='Stop'
                  labelPosition='left'
                  onClick={() => stopTaskMutation({ variables: { taskId: task.id } })}
                />
              )}
              {!isRunning(task) && (
                <Button
                  content='Start'
                  color='blue'
                  onClick={() => startTaskMutation({ variables: { taskId: task.id } })}
                />
              )}
              <EditIcon onClick={() => onEditTaskClicked(task)}>
                <Icon name='pencil' />
              </EditIcon>
            </TaskActions>
          </TaskItem>
        </Segment>
      ))}
      <Segment attached='bottom'>
        <TotalTime>
          {formatDuration(totalTime * 1000)}
        </TotalTime>
      </Segment>
    </Fragment>
  )
}

export default compose(
  graphql(START_TASK, { name: 'startTaskMutation' }),
  graphql(STOP_TASK, { name: 'stopTaskMutation' })
)(TaskList)
