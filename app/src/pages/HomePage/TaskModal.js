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

const DELETE_TASK = gql`
  mutation DeleteTaskMutation($taskId:ID!) {
    deleteTask(taskId: $taskId) 
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
    handleSubmit,
    onDeleteClicked
  } = props
  const updating = values.id
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
      <Button type='submit'>{values.id ? 'Update!' : 'Create!'}</Button>
      {updating && (
        <Button
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

const TaskModal = ({ visible = false, task, onClose, onTaskSaved, onTaskDeleted, projectId, createTaskMutation, updateTaskMutation, deleteTaskMutation }) => {
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

  const deleteTask = async (taskId) => {
    await deleteTaskMutation({ variables: { taskId }})
    onClose()
    onTaskDeleted()
  }

  return (
    <Modal open={visible} onClose={onClose} closeIcon>
      <Header icon='file' content='Create a task' />
      <Modal.Content>
        <Formik
          initialValues={task ? { projectId, ...task } : { projectId, description: '' }}
          validationSchema={validationSchema}
          render={formikProps => (
            <TaskForm
              {...formikProps}
              onDeleteClicked={taskId => deleteTask(taskId)}
            />
          )}
          onSubmit={values => values.id ? updateTask(values) : createTask(values)}
        />
      </Modal.Content>
    </Modal>
  )
}

export default compose(
  graphql(CREATE_TASK, { name: 'createTaskMutation' }),
  graphql(UPDATE_TASK, { name: 'updateTaskMutation' }),
  graphql(DELETE_TASK, { name: 'deleteTaskMutation' })
)(TaskModal)
