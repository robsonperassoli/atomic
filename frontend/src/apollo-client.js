import { ApolloClient, createHttpLink, InMemoryCache, ApolloLink, getMainDefinition } from '@apollo/client'
import * as AbsintheSocket from '@absinthe/socket'
import { createAbsintheSocketLink } from '@absinthe/socket-apollo-link'
import { Socket as PhoenixSocket } from 'phoenix'
import { setContext } from 'apollo-link-context'
import resolvers, { initialState } from './state'
import { API_URL, WS_URL } from './config'

const { token } = initialState.data
const absintheSocketLink = createAbsintheSocketLink(AbsintheSocket.create(
  new PhoenixSocket(WS_URL, { params: { token } })
))

const cache = new InMemoryCache()

const httpLink = createHttpLink({
  uri: API_URL,
})

const authLink = setContext((_, { headers }) => {

  return {
    headers: {
      ...headers,
      'Authorization': token ? `Bearer ${token}` : ''
    }
  }
})

const httpLinkWithAuth = authLink.concat(httpLink)

const link = ApolloLink.split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  absintheSocketLink,
  httpLinkWithAuth
)

const client = new ApolloClient({
  link,
  cache,
  resolvers
})

cache.writeData(initialState)

export default client
