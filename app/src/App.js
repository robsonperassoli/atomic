import React, { Component } from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import './App.css'

class App extends Component {
  render() {
    const { location } =  this.props
    const isLoginPage = location.pathname === '/login'
    const loggedIn = false;
    return (
      <div className='atomic'>
        
        {(!isLoginPage && !loggedIn) && (
          <Redirect to='/login' />
        )}

        {(isLoginPage && loggedIn) && (
          <Redirect to='/' />
        )}

        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/login' component={LoginPage} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App)
