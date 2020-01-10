import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Grommet } from 'grommet'
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client'
import theme from './theme'
import resolvers, { initialState } from './state'
import requireAuth from './helpers/requireAuth'
import requireNotAuthenticated from './helpers/requireNotAuthenticated'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'

const cache = new InMemoryCache()

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql',
  }),
  cache,
  resolvers
})

cache.writeData(initialState)

function App() {
  return (
    <ApolloProvider client={client}>
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
