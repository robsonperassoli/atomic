import React from 'react'
import { Box } from 'grommet'
import styled from 'styled-components'

const edgeSize = () => ({ theme}) => theme.global.edgeSize.xsmall

const MenuWrapper = styled(Box)`
  border-radius: ${edgeSize()} ${edgeSize()} 0 0;
`

function WeekDaysMenu({ dates, onDateSelected, selectedDate }) {
  return (
    <MenuWrapper
      direction='row'
      fill='horizontal'
      justify='between'
      border='all'
      round='xsmall'
      margin={{ top: 'small' }}
    >
      {dates.map((date, i) => (
        <Box
          pad='small'
          border={i !== dates.length - 1 ? 'right' : null}
          fill
          align='center'
          onClick={() => onDateSelected(date)}
          background={date.hasSame(selectedDate, 'day') ? 'light-2' : null}
          key={date.toISO()}
        >
          {date.toFormat('EEE')}
        </Box>
      ))}
    </MenuWrapper>
  )
}

export default WeekDaysMenu
