import * as storage from './helpers/storage'

const token = storage.load('token')

export const initialState = { data: { authenticated: !!token, token } }
export default {
  Mutation: {
    authenticate: (_root, variables, { cache }) => {
      const { token } = variables
      const data = { token, authenticated: true }
      cache.writeData({ data })
      console.log(data, cache)
      return null
    }
  }
}
