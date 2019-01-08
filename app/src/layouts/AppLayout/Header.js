import React from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'
import styled from 'styled-components'

const selectedProjectName = (selectedId, projects) => {
  const selectedProject = projects.find(({ id }) => id === selectedId)
  return selectedProject ? selectedProject.name : 'Select a Project'
}

const HeaderContainer = styled.div`
  margin-top: 20px;
`

const Header = ({ projects = [], selectedProjectId, onProjectSelected }) => (
  <HeaderContainer>
    <Menu>
      <Menu.Item header>Atomic</Menu.Item>
      <Dropdown item text={selectedProjectName(selectedProjectId, projects)}>
        <Dropdown.Menu>
          <Dropdown.Header>Projects</Dropdown.Header>
          {projects.map(({ name, id }) => (
            <Dropdown.Item key={id} onClick={() => onProjectSelected(id)}>{name}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Menu>
  </HeaderContainer>
)

export default Header
