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
import { WebSocketLink } from 'apollo-link-ws'
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import { createAbsintheSocketLink } from '@absinthe/socket-apollo-link'
import * as AbsintheSocket from '@absinthe/socket'
import {Socket as PhoenixSocket} from 'phoenix'
import {hasSubscription} from '@jumpn/utils-graphql'
import { load } from './LocalData'
import stateConfigs from './state'
import { API_URL } from './config'

const cache = new InMemoryCache()

const httpLink = createHttpLink({ uri: API_URL })

const token = load('token')

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
})

const wsLink = createAbsintheSocketLink(AbsintheSocket.create(
 new PhoenixSocket('ws://localhost:4000/socket', { params: { token: token } }),
))

const stateLink = withClientState({
  cache,
  ...stateConfigs
})


const networkLink = split(
  operation => hasSubscription(operation.query),
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link: stateLink.concat(authLink).concat(networkLink),
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
