import React, { Component } from 'react'
import { Switch, Route } from 'react-router'
import styled from 'styled-components'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage/HomePage'
import RegistrationPage from './pages/RegistrationPage'
import requireAuth from './components/hocs/requireAuth'
import requireNotAuthenticated from './components/hocs/requireNotAuthenticated'

const AppRoot = styled.div`
  height: 100%;
`

class App extends Component {
  render() {
    return (
      <AppRoot>
        <Switch>
          <Route exact path='/' component={requireAuth(HomePage)} />
          <Route exact path='/login' component={requireNotAuthenticated(LoginPage)} />
          <Route exact path='/register' component={requireNotAuthenticated(RegistrationPage)} />
        </Switch>
      </AppRoot>
    )
  }
}

export default App
