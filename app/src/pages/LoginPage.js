import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components'
import { AuthContext } from '../contexts/AuthContext'

const LOGIN = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('Required'),
  password: Yup.string()
    .required('Required')
})

const LoginForm = props => {
  const {
    errors,
    touched,
    handleChange,
    handleSubmit,
    showLoginError
  } = props

  return (
    <Form size='large' onSubmit={handleSubmit}>
      <Segment>
        {showLoginError && (
          <Message negative>
            <p>Invalid login credentials</p>
          </Message>
        )}

        <Form.Field>
          <Form.Input
            fluid
            icon='user'
            iconPosition='left'
            placeholder='E-mail address'
            name='email'
            error={!!errors.email && !!touched.email}
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

        <Button color='teal' fluid size='large' type='submit'>Login</Button>
      </Segment>
    </Form>
  )
}

const LoginPageWrapper = styled.div`
  height: 100%;
`

class LoginPage extends Component {
  state = {
    showLoginError: false
  }

  async doLogin ({ email, password }) {
    const { loginMutation, userLoggedIn, history } = this.props

    this.setState({ showLoginError: false })

    try {
      const { data } = await loginMutation({ variables: { email, password } })
      const { token } = data.login

      userLoggedIn(token)

      history.push('/')
    } catch (err) {
      console.error(err)
      this.setState({ showLoginError: true })
    }
  }

  render () {
    const { showLoginError } = this.state
    return (
      <LoginPageWrapper>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>Log-in to your account</Header>

            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={validationSchema}
              render={formikProps => <LoginForm {...formikProps} showLoginError={showLoginError} />}
              onSubmit={values => this.doLogin(values)}
            />

            <Message>
              Not registered? <Link to='/register'>Sign Up</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </LoginPageWrapper>
    )
  }
}

const LoginPageWithMutation = graphql(LOGIN, { name: 'loginMutation' })(LoginPage)

export default props => (
  <AuthContext.Consumer>
    {({ userLoggedIn }) => <LoginPageWithMutation {...props} userLoggedIn={userLoggedIn} />}
  </AuthContext.Consumer>
)
