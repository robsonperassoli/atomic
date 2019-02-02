import React, { Component } from 'react'
import { Switch, Route } from 'react-router'
import styled from 'styled-components'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage/HomePage'
import RegistrationPage from './pages/RegistrationPage'
import requireAuth from './components/hocs/requireAuth'
import requireNotAuthenticated from './components/hocs/requireNotAuthenticated'
import { Subscription } from 'react-apollo'
import gql from 'graphql-tag'

const AppRoot = styled.div`
  height: 100%;
`

const TIMER_SUBSCRIPTION = gql`
  subscription TimerUpdated {
    timerUpdated
  }
`



class App extends Component {
  render() {
    return (
      <Subscription subscription={TIMER_SUBSCRIPTION}>
        {({ data, loading, error }) => {
          console.log(data, error)
          return (
            <AppRoot>
              <Switch>
                <Route exact path='/' component={requireAuth(HomePage)} />
                <Route exact path='/login' component={requireNotAuthenticated(LoginPage)} />
                <Route exact path='/register' component={requireNotAuthenticated(RegistrationPage)} />
              </Switch>
            </AppRoot>
          )
        }}
      </Subscription>

    )
  }
}

export default App
