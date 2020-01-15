import React from 'react'
import { Layer, Form, TextArea, Button, Box, FormField } from 'grommet'
import { Checkmark } from 'grommet-icons'
import { gql, useMutation } from '@apollo/client'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useSelectedProjectId from '../../hooks/useSelectedProjectId'

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
    updateTask(id: $taskId, description: $description) {
      id
      description
    }
  }
`

const DELETE_TASK = gql`
  mutation DeleteTaskMutation($taskId:ID!) {
    deleteTask(id: $taskId) 
  }
`

const validationSchema = Yup.object().shape({
  description: Yup.string()
    .min(10)
    .required('Required')
})

function TaskModal({ onClose, onTaskSaved, onTaskDeleted, task }) {
  const [createTask] = useMutation(CREATE_TASK)
  const [updateTask] = useMutation(UPDATE_TASK)
  const [deleteTask] = useMutation(DELETE_TASK)

  const projectId = useSelectedProjectId()
  const onSubmit = async ({ description }) => {
    const variables = { variables: { ...(task ? { taskId: task.id } : { projectId } ), description } }
    task ? await updateTask(variables) : await createTask(variables)
    onClose()
    onTaskSaved()
  }
  const form = useFormik({ initialValues: task || {}, validationSchema, onSubmit })

  return (
    <Layer
      onEsc={onClose}
      onClickOutside={onClose}
    >
      <Box margin='medium' width='medium'>
        <Form onSubmit={form.handleSubmit}>
          <FormField error={form.touched.description && form.errors.description}>
            <TextArea onChange={form.handleChange} placeholder='Type the task description' rows={4} name='description' value={form.values.description} />
          </FormField>

          <Button icon={<Checkmark />} type='submit' label='Save' margin={{ top: 'small' }} />
        </Form>
      </Box>
    </Layer>
  )
}

export default TaskModal
