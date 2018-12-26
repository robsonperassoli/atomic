import React from 'react'
import {Menu, Dropdown} from 'semantic-ui-react'
import styled from 'styled-components'

const HeaderContainer = styled.div`
  margin-top: 20px;
`

const Header = ({ projects = [] }) => (
  <HeaderContainer>
    <Menu>
      <Menu.Item header>Atomic</Menu.Item>
      <Dropdown item text='Project One'>
        <Dropdown.Menu>
          <Dropdown.Header>Projects</Dropdown.Header>
          {projects.map(({ name, id }) => (
            <Dropdown.Item key={id}>{name}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Menu>
  </HeaderContainer>
)

export default Header
