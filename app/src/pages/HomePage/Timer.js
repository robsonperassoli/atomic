import React, { useState, useEffect } from 'react'
import formatDuration from 'format-duration'
import styled from 'styled-components'
import differenceInMilliseconds from 'date-fns/difference_in_milliseconds'

const Container = styled.div`
  flex: 1;
  text-align: right;
  font-size: 1.2em;
  font-weight: 600;
  color: #656565;
`

const secondsToMillis = time => time * 1000
const timerRunning = timerStatus => timerStatus === 'running'
const calcElapsedTime = ({ time, timerStartedAt, timerStatus }) =>
  secondsToMillis(time) + (timerRunning(timerStatus) ? differenceInMilliseconds(new Date(), timerStartedAt) : 0)

const Timer = ({ task }) => {
  const [elapsedTime, setElapsedTime] = useState(calcElapsedTime(task))

  useEffect(() => {
    const interval = setInterval(() => setElapsedTime(calcElapsedTime(task)), 1000)
    return () => clearInterval(interval)
  })

  return (
    <Container>{formatDuration(elapsedTime)}</Container>
  )
}

export default Timer
