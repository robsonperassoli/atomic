import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Grommet } from 'grommet'
import { ApolloProvider } from '@apollo/client'
import theme from './theme'
import requireAuth from './helpers/requireAuth'
import requireNotAuthenticated from './helpers/requireNotAuthenticated'
import Login from './pages/Login'
import Home from './pages/Home/Home'
import Register from './pages/Register'
import apolloClient from './apollo-client'

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Grommet theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={requireAuth(Home)} />
            <Route path='/login' component={requireNotAuthenticated(Login)} />
            <Route path='/register' component={requireNotAuthenticated(Register)} />
          </Switch>
        </BrowserRouter>
      </Grommet>
    </ApolloProvider>
  )
}

export default App;
