import React from 'react'
import { Box, Text, Button } from 'grommet'
import { Edit, Clock } from 'grommet-icons'
import Timer from './Timer'

function Task({ task, onTaskStart, onTaskStop, onEditClicked }) {
  return (
    <Box direction='row' justify='between' margin={{ vertical: 'xsmall' }}>
      <Text>{task.description}</Text>
      <Box direction='row' gap='10px'>
        <Timer task={task} />
        {task.timerStatus === 'running' ? (
          <Button primary color='#ccc' label='Stop' icon={<Clock />} gap='xsmall' onClick={onTaskStop} />
        ) : (
          <Button primary label='Start' onClick={onTaskStart} />
        )}
        <Button onClick={onEditClicked}>
          <Edit />
        </Button>
      </Box>
    </Box>
  )
}

export default Task
