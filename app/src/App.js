import React, { Component } from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import RegistrationPage from './pages/RegistrationPage'
import requireAuth from './components/hocs/requireAuth'
import requireNotAuthenticated from './components/hocs/requireNotAuthenticated'
import './App.css'


class App extends Component {
  render() {
    return (
      <div className='atomic'>
        <Switch>
          <Route exact path='/' component={requireAuth(HomePage)} />
          <Route exact path='/login' component={requireNotAuthenticated(LoginPage)} />
          <Route exact path='/register' component={requireNotAuthenticated(RegistrationPage)} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App)
