import React from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { Modal, Header, Form, Button, Input } from 'semantic-ui-react'
import { Formik } from 'formik'
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

const ProjectForm = (props) => {
  const {
    errors,
    touched,
    values,
    handleChange,
    handleSubmit,
    onDeleteClicked
  } = props
  const updating = values.id
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field required>
        <Form.Field
          name='name'
          control={Input}
          placeholder='Enter the project name'
          error={!!errors.name && !!touched.name}
          value={values.name}
          onChange={handleChange}
        />
      </Form.Field>
      <Button type='submit'>{values.id ? 'Update!' : 'Create!'}</Button>
      {updating && (
        <Button
          type='button'
          icon='trash alternate'
          color='red'
          content='Delete'
          labelPosition='left'
          onClick={() => onDeleteClicked(values.id)}
        />
      )}

    </Form>
  )
}

const ProjectModal = ({ visible = false, project, onClose, onProjectSaved, onProjectDeleted, createProjectMutation, updateProjectMutation, deleteProjectMutation }) => {
  const createProject = async ({ name }) => {
    await createProjectMutation({ variables: { name }})
    onClose()
    onProjectSaved()
  }

  const updateProject = async ({ id, name }) => {
    await updateProjectMutation({ variables: { id, name }})
    onClose()
    onProjectSaved
  }

  const deleteProject = async (id) => {
    await deleteProjectMutation({ variables: { id }})
    onClose()
    onProjectDeleted()
  }

  return (
    <Modal open={visible} onClose={onClose} closeIcon>
      <Header icon='file' content='Create Project' />
      <Modal.Content>
        <Formik
          initialValues={project || { name: '' }}
          validationSchema={validationSchema}
          render={formikProps => (
            <ProjectForm
              {...formikProps}
              onDeleteClicked={projectId => deleteProject(projectId)}
            />
          )}
          onSubmit={values => values.id ? updateProject(values) : createProject(values)}
        />
      </Modal.Content>
    </Modal>
  )
}

export default compose(
  graphql(CREATE_PROJECT, { name: 'createProjectMutation' }),
  graphql(UPDATE_PROJECT, { name: 'updateProjectMutation' }),
  graphql(DELETE_PROJECT, { name: 'deleteProjectMutation' })
)(ProjectModal)
