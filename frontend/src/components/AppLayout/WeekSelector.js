import React, { useState } from 'react'
import { DateTime } from 'luxon'
import { Button, Calendar, Layer } from 'grommet'
import { Schedule } from 'grommet-icons'

const getWeekRange = (date) => {
  const weekStart = date.startOf('week').startOf('day')
  return [[weekStart.toISO(), weekStart.plus({ days: 6 }).toISO()]]
}

const formatRange = (range) => {
  if (!range) {
    return ''
  }

  const start =  DateTime.fromISO(range[0][0])
  const end =  DateTime.fromISO(range[0][1])

  const format = 'MMMM d'
  return `${start.toFormat(format)} to ${end.toFormat(format)}`
}

function WeekSelector({ date, onDateChanged = () => null }) {
  const [open, setOpen] = useState(false)

  const onSelect = date => {
    onDateChanged(DateTime.fromISO(date).startOf('day'))
    setOpen(false)
  }

  const range = date ? getWeekRange(date) : undefined
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        icon={<Schedule />}
        label={formatRange(range)}
        hoverIndicator
        plain
      />
      {open && (
        <Layer
          onClickOutside={() => setOpen(false)}
          onEsc={() => setOpen(false)}
        >
          <Calendar
            firstDayOfWeek={1}
            daysOfWeek
            onSelect={onSelect}
            dates={range}
          />
        </Layer>
      )}
    </>
  )
}

export default WeekSelector
