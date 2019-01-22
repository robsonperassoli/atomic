import React, { useState, Fragment } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components'

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

const RegistrationForm = props => {
  const {
    errors,
    touched,
    handleChange,
    handleSubmit,
    showError
  } = props

  return (
    <Form size='large' onSubmit={handleSubmit}>
      <Segment>
        {showError && (
          <Message negative>
            <p>Registration failed</p>
          </Message>
        )}

        <Form.Field>
          <Form.Input
            fluid
            placeholder='E-mail address'
            name='email'
            error={!!errors.email && !!touched.email}
            onChange={handleChange}
          />
        </Form.Field>

        <Form.Field>
          <Form.Input
            fluid
            placeholder='Full Name'
            name='name'
            error={!!errors.name && !!touched.name}
            onChange={handleChange}
          />
        </Form.Field>

        <Form.Input
          fluid
          icon='lock'
          iconPosition='left'
          placeholder='Password'
          type='password'
          name='password'
          error={!!errors.password && !!touched.password}
          onChange={handleChange}
        />

        <Form.Input
          fluid
          icon='lock'
          iconPosition='left'
          placeholder='Password Confirmation'
          type='password'
          name='passwordConfirmation'
          error={!!errors.passwordConfirmation && !!touched.passwordConfirmation}
          onChange={handleChange}
        />

        <Button color='teal' fluid size='large' type='submit'>Register</Button>
      </Segment>
    </Form>
  )
}

const RegistrationPageWrapper = styled.div`
  height: 100%;
`

const RegistrationPage = ({ registerMutation, history }) => {
  const [registerFailed, setRegisterFailed] = useState(false)
  const [registerSuccess, setRegisterSuccess] = useState(false)

  const register = async ({ email, name, password }) => {
    setRegisterFailed(false)

    try {
      await registerMutation({ variables: { email, name, password } })
      setRegisterSuccess(true)
    } catch (err) {
      console.error(err)
      setRegisterFailed(true)
    }
  }

  return (
    <RegistrationPageWrapper>
      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>


          {!registerSuccess && (
            <Fragment>
              <Header as='h2' color='teal' textAlign='center'>Register</Header>
              <Formik
                initialValues={{ email: '', name: '', password: '', passwordConfirmation: '' }}
                validationSchema={validationSchema}
                render={formikProps => (
                  <RegistrationForm {...formikProps} showError={registerFailed} />
                )}
                onSubmit={values => register(values)}
              />
            </Fragment>
          )}

          {registerSuccess && (
            <Message positive>
              <Message.Header>Registration Successful</Message.Header>
              <p>Registration successful, click <Link to='/login'>here</Link> to login.</p>
            </Message>
          )}
        </Grid.Column>
      </Grid>
    </RegistrationPageWrapper>
  )
}


const RegistrationPageWithMutation = graphql(
  REGISTER,
  { name: 'registerMutation' }
)(RegistrationPage)

export default RegistrationPageWithMutation
