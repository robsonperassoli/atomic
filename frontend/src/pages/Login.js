import React from 'react'
import { useFormik } from 'formik'
import { Box, Button, FormField, TextInput } from 'grommet'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  password: Yup.string()
    .required('Required')
})

const initialValues = { email: '', password: '' }
const onSubmit = values => console.log(values)

function Login() {
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
