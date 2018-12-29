import React from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
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

const UPDATE_TASK = gql`
  mutation UpdateTaskMutation($taskId:ID!, $description: String!) {
    updateTask(taskId: $taskId, description: $description) {
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
    values,
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
          value={values.description}
          onChange={handleChange}
        />
        </Form.Field>
      <Button type='submit'>Create!</Button>
    </Form>
  )
}

const TaskModal = ({ visible = false, task, onClose, onTaskSaved, projectId, createTaskMutation, updateTaskMutation }) => {
  const createTask = async ({ projectId, description }) => {
    await createTaskMutation({ variables: { projectId, description }})
    onClose()
    onTaskSaved()
  }

  const updateTask = async ({ id, description }) => {
    await updateTaskMutation({ variables: { taskId: id, description }})
    onClose()
    onTaskSaved()
  }

  return (
    <Modal open={visible} onClose={onClose} closeIcon>
      <Header icon='file' content='Create a task' />
      <Modal.Content>
        <Formik
          initialValues={task ? { projectId, ...task } : { projectId, description: '' }}
          validationSchema={validationSchema}
          render={formikProps => <TaskForm {...formikProps} />}
          onSubmit={values => values.id ? createTask(values) : updateTask(values)}
        />
      </Modal.Content>
    </Modal>
  )
}

export default compose(
  graphql(CREATE_TASK, { name: 'createTaskMutation' }),
  graphql(UPDATE_TASK, { name: 'updateTaskMutation' })
)(TaskModal)
