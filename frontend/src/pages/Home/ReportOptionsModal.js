import React, { useState } from 'react'
import { Layer, Button, Box, Select, Text } from 'grommet'
import { Close } from 'grommet-icons'
import { DateTime } from 'luxon'

const reportTimePeriods = {
  month: {
    startDate: DateTime.local().startOf('month').startOf('day').toUTC(),
    endDate: DateTime.local().endOf('month').endOf('day').toUTC()
  },
  week: {
    startDate: DateTime.local().startOf('week').startOf('day').toUTC(),
    endDate: DateTime.local().endOf('week').endOf('day').toUTC()
  },
  previousMonth: {
    startDate: DateTime.local().minus({ month: 1 }).startOf('month').startOf('day').toUTC(),
    endDate: DateTime.local().minus({ month: 1 }).endOf('month').endOf('day').toUTC()
  }
}

function ReportOptionsModal({ onReportRequest, onClose }) {
  const [selectedOption, setSelectedOption] = useState()
  const onRequestClicked = () => onReportRequest(reportTimePeriods[selectedOption.value])

  return (
    <Layer
      onEsc={onClose}
      onClickOutside={onClose}
    >
      <Box pad='medium' gap='20px'>
        <Box align='end'>
          <Close onClick={onClose} />
        </Box>
        <Text>Select the time period for your report</Text>
        <Select
          placeholder='Select an option'
          options={[
            { label: 'This Month', value: 'month' },
            { label: 'This Week', value: 'week' },
            { label: 'Previous Month', value: 'previousMonth' },
          ]}
          value={selectedOption}
          onChange={option => setSelectedOption(option.value)}
          labelKey='label'
          valueKey='value'
        />
        <Button label='Request Report' onClick={onRequestClicked} disabled={!selectedOption} />
      </Box>
    </Layer>
  )
}

export default ReportOptionsModal
