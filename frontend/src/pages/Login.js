import React, { useState } from 'react'
import { useFormik } from 'formik'
import { useMutation, gql } from '@apollo/client'
import { Box, Button, FormField, TextInput, Heading, Text } from 'grommet'
import * as Yup from 'yup'
import Link from '../components/Link'

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
  const [loginFailed, setLoginFailed] = useState(false)

  const onSubmit = async values => {
    try {
      setLoginFailed(false)

      const { data } = await doLogin({ variables: values })
      const { login: { token } } = data
      await authenticate({ variables: { token }})
      history.replace('/')
      window.location.reload()
    } catch(err) {
      setLoginFailed(true)
    }
  }

  const form = useFormik({ initialValues, onSubmit, validationSchema })
  return (
    <Box fill align='center' justify='center'>
      <Heading level='3'>Log-in to your account</Heading>
      <Box as='form' onSubmit={form.handleSubmit} width='medium'>
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
        {loginFailed && <Text color='status-error'>Authentication failed</Text>}
        <Button type='submit' label='Login' primary margin={{ vertical: 'medium' }} />
      </Box>
      <Box margin={{ vertical: 'medium', horizontal: 'small' }} justify='end' direction='row' gap='xsmall'>
        Not registered? <Link to='/register'>Sign Up</Link>
      </Box>
    </Box>
  )
}

export default Login
