import React from 'react'
import { Box } from 'grommet'

function Container({ children }) {
  return (
    <Box justify='center' direction='row' margin={{ horizontal: 'xsmall' }}>
      <Box width='xlarge'>
        {children}
      </Box>
    </Box>
  )
}

export default Container
