import React, { Component } from 'react';
import { Switch, Route } from 'react-router'
import Header from './Header';
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='atomic'>
        <Header />

        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/login' component={LoginPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
