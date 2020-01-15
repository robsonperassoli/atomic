import React from 'react'
import { gql, useMutation } from '@apollo/client'
import { Box } from 'grommet'
import Task from './Task'

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

function TaskList({ tasks, onTaskEdit }) {
  const [startTask] = useMutation(START_TASK)
  const [stopTask] = useMutation(STOP_TASK)
  if (tasks.length === 0) {
    return (<Box pad='medium' align='center'>Task list is empty :)</Box>)
  }

  return (
    <Box>
      {tasks.map(task => (
        <Task
          key={task.id}
          task={task}
          onTaskStart={() => startTask({ variables: { taskId: task.id } })}
          onTaskStop={() => stopTask({ variables: { taskId: task.id } })}
          onEditClicked={() => onTaskEdit(task)}
        />
      ))}
    </Box>
  )
}

export default TaskList
