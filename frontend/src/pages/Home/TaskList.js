import React from 'react'
import { gql, useMutation } from '@apollo/client'
import { Box, Text } from 'grommet'
import styled from 'styled-components'
import { formatDuration } from '../../helpers/tasks'
import Task from './Task'

const edgeSize = () => ({ theme}) => theme.global.edgeSize.xsmall

const TotalHoursBox = styled(Box)`
  border-color: ${({ theme }) => theme.global.colors.border.light};
  border-width: ${({ theme }) => theme.global.borderSize.xsmall};
  border-style: solid;
  border-radius: 0 0 ${edgeSize()} ${edgeSize()};
`

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

  const totalTime = tasks.reduce((sum, task) => sum + task.time, 0)
  return (
    <>
      <Box border='vertical'>
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
      <TotalHoursBox justify='end' direction='row'>
        <Text margin='small' weight='bold' color='gray' size='large'>{formatDuration(totalTime * 1000)}</Text>
      </TotalHoursBox>
    </>
  )
}

export default TaskList
