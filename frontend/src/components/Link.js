import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Anchor } from 'grommet'

function Link({ children, styleProps = {}, ...props }){
  return (
    <RouterLink {...props}>
      <Anchor as='span' {...styleProps}>{children}</Anchor>
    </RouterLink>
  )
}

export default Link
