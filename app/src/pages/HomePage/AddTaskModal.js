import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Modal, Header, Form, Button, TextArea } from 'semantic-ui-react'
import { Formik } from 'formik'
import * as Yup from 'yup'

const CREATE_TASK = gql`
  mutation CreateTaskMutation($projectId:ID!, $description: String!) {
    createTask(projectId: $projectId, description: $description) {
      id
      description
    }
  }
`

const validationSchema = Yup.object().shape({
  description: Yup.string()
    .min(10)
    .required('Required'),
  projectId: Yup.string()
    .required('Required')
})

const TaskForm = (props) => {
  const {
    errors,
    touched,
    handleChange,
    handleSubmit
  } = props
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field required>
        <Form.Field
          name='description'
          control={TextArea}
          placeholder='Enter the task description'
          error={!!errors.description && !!touched.description}
          onChange={handleChange}
        />
        </Form.Field>
      <Button type='submit'>Create!</Button>
    </Form>
  )
}

const AddTaskModal = ({ visible = false, onClose, projectId, createTaskMutation }) => {
  const createTask = async ({ projectId, description }) => {
    await createTaskMutation({ variables: { projectId, description }})
    onClose()
  }

  return (
    <Modal open={visible} onClose={onClose} closeIcon>
      <Header icon='file' content='Create a task' />
      <Modal.Content>
        <Formik
          initialValues={{ projectId, description: '' }}
          validationSchema={validationSchema}
          render={formikProps => <TaskForm {...formikProps} />}
          onSubmit={values => createTask(values)}
        />
      </Modal.Content>
    </Modal>
  )
}

export default graphql(CREATE_TASK, { name: 'createTaskMutation' })(AddTaskModal)
