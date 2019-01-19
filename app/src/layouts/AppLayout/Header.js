import React, { useState } from 'react'
import { Menu, Dropdown, Icon } from 'semantic-ui-react'
import styled from 'styled-components'
import ProjectModal from '../../components/Project/ProjectModal'

const selectedProjectName = (selectedId, projects) => {
  const selectedProject = projects.find(({ id }) => id === selectedId)
  return selectedProject ? selectedProject.name : 'Select a Project'
}

const HeaderContainer = styled.div`
  margin-top: 20px;
`

const Header = ({ projects = [], selectedProjectId, onProjectSelected, onProjectCreated }) => {
  const [projectModalOpen, setProjectModalOpen] = useState(false)
  return (
    <HeaderContainer>
      <ProjectModal
        visible={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
        onProjectSaved={onProjectCreated}
        onProjectDeleted={() => null}
      />
      <Menu>
        <Menu.Item header>Atomic</Menu.Item>
        <Dropdown item text={selectedProjectName(selectedProjectId, projects)}>
          <Dropdown.Menu>
            <Dropdown.Header>Projects</Dropdown.Header>
            {projects.map(({ name, id }) => (
              <Dropdown.Item key={id} onClick={() => onProjectSelected(id)}>{name}</Dropdown.Item>
            ))}
            <Dropdown.Item key='create-project' onClick={() => setProjectModalOpen(true)}>
              <Icon name='plus' /> New Project
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
    </HeaderContainer>
  )
}

export default Header
