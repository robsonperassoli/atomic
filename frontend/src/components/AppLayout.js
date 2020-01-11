import React from 'react'
import { Box, Header, Text, Menu } from 'grommet'
import { Add } from 'grommet-icons'
import { useQuery, useMutation, gql } from '@apollo/client'
import useSelectedProjectId from '../hooks/useSelectedProjectId'

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

function AppLayout({ children }) {
  const { data = {} } = useQuery(APP_QUERY)
  const [selectProject] = useMutation(SELECT_PROJECT_MUTATION)
  const selectedProjectId = useSelectedProjectId()

  const onSelectProject = projectId => () => selectProject({ variables: { projectId } })
  const createItem = ({ id, name }) => ({ label: name, onClick: onSelectProject(id) })

  const projects = data.projects || []
  const selectedProject = projects.find(p => p.id === selectedProjectId)
  return (
    <>
      <Header background='brand'>
        <Text>Atomic</Text>
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
              onClick: () => console.log('new project')
            }
          ]}
        />
      </Header>
      {children}
    </>
  )
}

export default AppLayout
