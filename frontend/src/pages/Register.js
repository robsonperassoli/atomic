import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import { Box, Button, FormField, Heading, TextInput, Text } from 'grommet'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import Link from '../components/Link'

Yup.addMethod(Yup.mixed, 'sameAs', function(ref, message) {
  return this.test('sameAs', message, function (value) {
    let other = this.resolve(ref);

    return !other || !value || value === other;
  })
})

const REGISTER = gql`
  mutation RegisterMutation($email: String!, $name: String!, $password: String!) {
    registerUser(email: $email, name: $name, password: $password) {
      email
      name
    }
  }
`

const validationSchema = Yup.object().shape({
  email: Yup.string().email()
    .required('Required'),
  name: Yup.string().min(5)
    .required('Required'),
  password: Yup.string()
    .min(6)
    .required('Required'),
  passwordConfirmation: Yup.string()
    .min(6)
    .sameAs(Yup.ref('password'), 'Passwords don\'t match')
    .required('Required')
})

const initialValues = { name: '', email: '', password: '', passwordConfirmation: '' }

function Register() {
  const [registrationComplete, setRegistrationComplete] = useState(false)
  const [registrationFailed, setRegistrationFailed] = useState(false)
  const [register] = useMutation(REGISTER)

  const onSubmit = async ({ name, email, password }) => {
    try {
      setRegistrationFailed(false)

      await register({ variables: { name, email, password } })
      setRegistrationComplete(true)
    } catch(err) {
      setRegistrationFailed(true)
    }
  }
  const form = useFormik({ initialValues, onSubmit, validationSchema })
  return (
    <Box fill align='center' justify='center'>
      {!registrationComplete && (
        <>
          <Heading level='3'>Register</Heading>
          <Box as='form' onSubmit={form.handleSubmit} width='medium'>
            <FormField label='Name' htmlFor='name' error={form.touched.name && form.errors.name}>
              <TextInput
                name='name'
                onChange={form.handleChange}
              />
            </FormField>

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

            <FormField label='Confirm Password' htmlFor='passwordConfirmation' error={form.touched.passwordConfirmation && form.errors.passwordConfirmation}>
              <TextInput
                name='passwordConfirmation'
                type='password'
                onChange={form.handleChange}
              />
            </FormField>

            {registrationFailed && (
              <Box direction='row' gap='5px'>
                <Text weight='bold' color='status-error'>Registration Failed. Try again.</Text>
              </Box>
            )}

            <Button type='submit' label='Register' primary margin={{ vertical: 'medium' }} />
          </Box>
        </>
      )}
      {registrationComplete && (
        <Box direction='row' gap='5px' margin='large'>
          <Text weight='bold' color='status-ok'>Registration Successful!</Text>
          <Text color='status-ok'>Click <Link to='/login'>here</Link> to login.</Text>
        </Box>
      )}
    </Box>
  )
}

export default Register
