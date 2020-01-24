import React, { useState, useEffect } from 'react'
import { Box, Text } from 'grommet'
import { elapsedTime as calcElapsedTime, formatDuration } from '../../helpers/tasks'

const Timer = ({ task }) => {
  const [elapsedTime, setElapsedTime] = useState(calcElapsedTime(task))

  useEffect(() => {
    const interval = setInterval(() => setElapsedTime(calcElapsedTime(task)), 1000)
    return () => clearInterval(interval)
  })

  return (
    <Box alignSelf='center'>
      <Text weight='bold'>{formatDuration(elapsedTime)}</Text>
    </Box>
  )
}

export default Timer
