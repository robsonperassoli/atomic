import React, { useState, useEffect } from 'react'
import { Box, Text } from 'grommet'
import { DateTime } from 'luxon'
import formatDuration from 'format-duration'

const secondsToMillis = time => time * 1000
const timerRunning = timerStatus => timerStatus === 'running'
const calcElapsedTime = ({ time, timerStartedAt, timerStatus }) =>
  secondsToMillis(time) + (timerRunning(timerStatus) ? DateTime.utc().diff(DateTime.fromISO(timerStartedAt)) : 0)

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
