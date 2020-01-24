import React from 'react'
import { Layer, Form, TextArea, Button, Box, FormField, MaskedInput } from 'grommet'
import { Checkmark, Trash } from 'grommet-icons'
import { gql, useMutation } from '@apollo/client'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components'
import { Duration } from 'luxon'
import useSelectedProjectId from '../../hooks/useSelectedProjectId'
import { formatDuration, timerRunning } from '../../helpers/tasks'

const TimeFormField = styled(FormField)`
  flex-direction: row;
  > label {
    flex-grow: 2;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-weight: 600;
  }
`

const TimeMaskedInput = styled(MaskedInput)`
  width: 100px;
  &:disabled {
    opacity: ${({ theme }) => theme.textInput.disabled.opacity
  }
`


const CREATE_TASK = gql`
  mutation CreateTaskMutation($projectId:ID!, $description: String!, $time: Int) {
    createTask(projectId: $projectId, description: $description, time: $time) {
      id
      description
      time
    }
  }
`

const UPDATE_TASK = gql`
  mutation UpdateTaskMutation($taskId:ID!, $description: String!, $time: Int) {
    updateTask(id: $taskId, description: $description, time: $time) {
      id
      description
      time
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

const createInitialValues = (task) => {
  if(!task) return { time: '00:00' }

  const { description } = task
  const time = formatDuration(task.time * 1000)
  return {
    description,
    time
  }
}

const formattedDurationToSeconds = (stringDuration) => {
  const [hours, minutes] = stringDuration.split(':')
  return Duration.fromObject({ hours, minutes }).as('seconds')
}

function TaskModal({ onClose, onTaskSaved, onTaskDeleted, task }) {
  const [createTask] = useMutation(CREATE_TASK)
  const [updateTask] = useMutation(UPDATE_TASK)
  const [deleteTask] = useMutation(DELETE_TASK)

  const updateVars = (task, formValues) => {
    const { description, time } = formValues
    const { id: taskId } = task

    return {
      variables: {
        taskId,
        description,
        ...(timerRunning(task.timerStatus) ? {} : { time: formattedDurationToSeconds(time) })
      }
    }
  }

  const createVars = ({ description, time }) => ({
    variables: { projectId, description, time: formattedDurationToSeconds(time) }
  })

  const projectId = useSelectedProjectId()
  const onSubmit = async (values) => {
    task ? await updateTask(updateVars(task, values)) : await createTask(createVars(values))
    onClose()
    onTaskSaved()
  }
  const onDelete = async () => {
    await deleteTask({ variables: { taskId: task.id } })
    onClose()
    onTaskDeleted()
  }
  const form = useFormik({ initialValues: createInitialValues(task), validationSchema, onSubmit })

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

          <TimeFormField error={form.touched.time && form.errors.time} label='Duration'>
            <TimeMaskedInput
              onChange={form.handleChange}
              placeholder='00:00'
              name='time'
              value={form.values.time}
              disabled={task && timerRunning(task.timerStatus)}
              mask={[
                { length: [1,2], regexp: /^[0-9]*$/, placeholder: 'hh' },
                { fixed: ':' },
                {
                  length: 2,
                  options: ['00', '05', '10', '15', '30', '45'],
                  regexp: /^[0-5][0-9]$|^[0-9]$/,
                  placeholder: 'mm',
                },
              ]}
            />
          </TimeFormField>

          <Box justify='between' direction='row'>
            {task && (
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

export default TaskModal
