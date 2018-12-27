import merge from 'lodash.merge'
import auth from './auth'
import app from './app'
import typeDefs from './typeDefs'

export default {
  ...merge(auth, app),
  typeDefs
}
