import * as LocalData from '../LocalData'

const localySavedauthToken = LocalData.load('token')

const typeDefs = `
  type Auth {
    loggedIn: Boolean!
    token: String!
  }
  type Mutation {
    userLoggedIn(token: String!): Auth
  }
  type Query {
    auth: Auth
  }
`;


const defaults = {
  auth: {
    loggedIn: !!localySavedauthToken,
    token: localySavedauthToken,
    __typename: 'Auth'
  }
}

const userLoggedIn = (_, {token}, {cache}) => {
  LocalData.save('token', token)
  const data = {
    auth: {
      __typename: 'Auth',
      loggedIn: true,
      token
    },
  }

  cache.writeData({data})

  return null
}

export default {
  defaults,
  resolvers: {
    Mutation: {
      userLoggedIn
    }
  },
  typeDefs
}
