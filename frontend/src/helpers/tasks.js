import { DateTime, Duration } from 'luxon'

const secondsToMillis = time => time * 1000

export const timerRunning = timerStatus => timerStatus === 'running'
export const elapsedTime = ({ time, timerStartedAt, timerStatus }) => {
  return secondsToMillis(time) + (timerRunning(timerStatus) ? DateTime.utc().diff(DateTime.fromISO(timerStartedAt)) : 0)
}

export const formatDuration = (timeInMillis) =>
  Duration.fromMillis(timeInMillis).toFormat('hh:mm')
