export default `
  type Auth {
    loggedIn: Boolean!
    token: String!
  }
  type Mutation {
    userLoggedIn(token: String!): Auth
    selectProject(projectId: ID!): ID
  }
  type Query {
    auth: Auth
    selectedProjectId: ID
  }
`
