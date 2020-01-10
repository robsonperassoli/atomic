import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Grommet } from 'grommet'
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client'
import theme from './theme'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql',
  })
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Grommet theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
          </Switch>
        </BrowserRouter>
      </Grommet>
    </ApolloProvider>
  )
}

export default App;
