import React from 'react'
import { useFormik } from 'formik'
import { useMutation, gql } from '@apollo/client'
import { Box, Button, FormField, TextInput } from 'grommet'
import * as Yup from 'yup'

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

const AUTH_MUTATION = gql`
  mutation AuthMutation($token: String!) {
    authenticate(token: $token) @client
  }
`

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  password: Yup.string()
    .required('Required')
})

const initialValues = { email: '', password: '' }

function Login({ history }) {
  const [doLogin] = useMutation(LOGIN_MUTATION)
  const [authenticate] = useMutation(AUTH_MUTATION)

  const onSubmit = async values => {
    const { data } = await doLogin({ variables: values })
    const { login: { token } } = data
    await authenticate({ variables: { token }})
    history.replace('/')
    window.location.reload()
  }

  const form = useFormik({ initialValues, onSubmit, validationSchema })

  return (
    <Box fill align='center' justify='center'>
      <form onSubmit={form.handleSubmit}>
        <FormField label='Email' htmlFor='email' error={form.touched.email && form.errors.email}>
          <TextInput
            name='email'
            onChange={form.handleChange}
          />
        </FormField>

        <FormField label='Password' htmlFor='password' error={form.touched.password && form.errors.password}>
          <TextInput
            name='password'
            type='password'
            onChange={form.handleChange}
          />
        </FormField>
        <Button type='submit' label='Login' primary />
      </form>
    </Box>
  )
}

export default Login
