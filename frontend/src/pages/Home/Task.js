import React from 'react'
import { Box, Text, Button } from 'grommet'
import { Edit, Clock } from 'grommet-icons'
import styled from 'styled-components'
import Timer from './Timer'

const Wrapper = styled(Box)`
  &:not(:last-child) {
    border-color: ${({ theme }) => theme.global.colors.border.light};
    border-width: 0 0 ${({ theme }) => theme.global.borderSize.xsmall} 0;
    border-style: solid;
  }
`

function Task({ task, onTaskStart, onTaskStop, onEditClicked }) {
  return (
    <Wrapper>
      <Box direction='row' justify='between' margin='small'>
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
    </Wrapper>
  )
}

export default Task
