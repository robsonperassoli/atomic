import React, { Component } from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('Required'),
  password: Yup.string()
    .required('Required')
})

const renderForm = props => {
  const {
    errors,
    handleChange,
    handleSubmit
  } = props

  return (
    <Form size='large' onSubmit={handleSubmit}>
      <Segment>
        <Form.Field>
          <Form.Input
            fluid
            icon='user'
            iconPosition='left'
            placeholder='E-mail address'
            name='email'
            error={!!errors.email}
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
          error={!!errors.password}
          onChange={handleChange}
        />

        <Button color='teal' fluid size='large' type='submit'>Login</Button>
      </Segment>
    </Form>
  )
}

class LoginPage extends Component {
  doLogin ({ email, password }) {
    console.log('login with', email, password)
  }

  render () {
    return (
      <div className='login-form'>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>Log-in to your account</Header>
            
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={validationSchema}
              render={renderForm}
              onSubmit={values => this.doLogin(values)}
            />

            <Message>
              Not registered? <Link to='/register'>Sign Up</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default LoginPage