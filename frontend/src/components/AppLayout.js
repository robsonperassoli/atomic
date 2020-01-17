import React, { useState } from 'react'
import { Box, Header, Text, Menu } from 'grommet'
import { Add, Clock } from 'grommet-icons'
import { useQuery, useMutation, gql } from '@apollo/client'
import styled from 'styled-components'
import useSelectedProjectId from '../hooks/useSelectedProjectId'
import ProjectModal from './ProjectModal'

const LogoText = styled(Text)`
  font-weight: 300;
  font-size: 21px;
`

const APP_QUERY = gql`
  {
    projects {
      id
      name
    }
  }
`

const SELECT_PROJECT_MUTATION = gql`
  mutation SelectProject($projectId: String!) {
    selectProject(projectId: $projectId) @client
  }
`

const modalClosed = { visible: false, props: {} }

function AppLayout({ children }) {
  const { data = {}, refetch } = useQuery(APP_QUERY)
  const [selectProject] = useMutation(SELECT_PROJECT_MUTATION)
  const selectedProjectId = useSelectedProjectId()
  const [projectModal, setProjectModal] = useState(modalClosed)

  const onSelectProject = projectId => () => selectProject({ variables: { projectId } })
  const createItem = ({ id, name }) => ({ label: name, onClick: onSelectProject(id) })

  const onProjectSaved = async ({ isNew, id: projectId }) => {
    await refetch()
    if(isNew) {
      selectProject({ variables: { projectId }})
    }
  }

  const projects = data.projects || []
  const selectedProject = projects.find(p => p.id === selectedProjectId)
  return (
    <>
      <Header background='brand' pad='xsmall'>
        <Box direction='row' gap='5px' margin={{ left: 'xsmall' }}>
          <Clock /><LogoText>Atomic</LogoText>
        </Box>
        <Menu
          label={selectedProject ? selectedProject.name : 'Select a project'}
          items={[
            ...projects.map(createItem),
            {
              label: (
                <Box direction='row' gap='5px'>
                  <Add />
                  <Text>New Project</Text>
                </Box>
              ),
              onClick: () => setProjectModal({ visible: true, props: {} })
            }
          ]}
        />
      </Header>
      {projectModal.visible && (
        <ProjectModal
          onProjectSaved={onProjectSaved}
          onClose={() => setProjectModal(modalClosed)}
          {...projectModal.props}
        />
      )}
      {children}
    </>
  )
}

export default AppLayout
