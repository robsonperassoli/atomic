import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import { withClientState } from 'apollo-link-state'
import { load } from './LocalData'
import stateConfigs from './state'

const cache = new InMemoryCache()

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
})

const authLink = setContext((_, { headers }) => {
  const token = load('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
})

const stateLink = withClientState({
  cache,
  ...stateConfigs
})


const client = new ApolloClient({
  link: stateLink.concat(authLink).concat(httpLink),
  cache,
})

ReactDOM.render((
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
), document.getElementById('root'))

registerServiceWorker()
