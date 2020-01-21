import React from 'react'
import { Layer, Form, TextInput, Button, Box, FormField } from 'grommet'
import { Checkmark, Trash } from 'grommet-icons'
import { gql, useMutation } from '@apollo/client'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const CREATE_PROJECT = gql`
  mutation CreateProjectMutation($name: String!) {
    createProject(name: $name) {
      id
      name
    }
  }
`

const UPDATE_PROJECT = gql`
  mutation UpdateProjectMutation($id:ID!, $name: String!) {
    updateProject(id: $id, name: $name) {
      id
      name
    }
  }
`

const DELETE_PROJECT = gql`
  mutation DeleteProjectkMutation($id:ID!) {
    deleteProject(id: $id)
  }
`

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3)
    .required('Required'),
})

function ProjectModal({ onClose, onProjectSaved, onProjectDeleted, project }) {
  const [createProject] = useMutation(CREATE_PROJECT)
  const [updateProject] = useMutation(UPDATE_PROJECT)
  const [deleteProject] = useMutation(DELETE_PROJECT)

  const create = async ({ name }) => {
    const { data } = await createProject({ variables: { name } })
    onProjectSaved({ ...data.createProject, isNew: true })
    onClose()
  }
  const update = async ({ project: { id }, name }) => {
    const { data } = await updateProject({ variables: { id, name } })
    onProjectSaved({ ...data.updateProject, isNew: false })
    onClose()
  }

  const onSubmit = async ({ name }) => {
    const action = project ? update : create
    await action({ project, name })
  }

  const onDelete = async () => {
    await deleteProject({ variables: { id: project.id } })
    onClose()
    onProjectDeleted()
  }

  const form = useFormik({ initialValues: project || {}, validationSchema, onSubmit })

  return (
    <Layer
      onEsc={onClose}
      onClickOutside={onClose}
    >
      <Box margin='medium' width='medium'>
        <Form onSubmit={form.handleSubmit}>
          <FormField error={form.touched.name && form.errors.name}>
            <TextInput
              onChange={form.handleChange}
              placeholder='Type the project name'
              name='name'
              value={form.values.name}
            />
          </FormField>

          <Box justify='between' direction='row'>
            {project && (
              <Button
                icon={<Trash />}
                label='Delete'
                color='status-error'
                primary
                margin={{ top: 'small' }}
                onClick={onDelete}
              />
            )}
            <Button
              type='submit'
              icon={<Checkmark />}
              label='Save'
              margin={{ top: 'small' }}
            />
          </Box>
        </Form>
      </Box>
    </Layer>
  )
}

export default ProjectModal
