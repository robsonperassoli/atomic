import * as storage from './helpers/storage'
import { isExpired } from './helpers/jwt'

const getToken = () => {
  const storedToken = storage.load('token')
  if (!!storedToken && isExpired(storedToken)) {
    storage.remove('token')
    return;
  }
  return storedToken
}
const selectedProjectId = storage.load('selectedProjectId')
const token = getToken()

export const initialState = { data: { authenticated: !!token, token, selectedProjectId } }
export default {
  Mutation: {
    authenticate: (_root, variables, { cache }) => {
      const { token } = variables
      const data = { token, authenticated: true }
      storage.save('token', token)
      cache.writeData({ data })
      return null
    },
    selectProject: (_root, variables, { cache }) => {
      const { projectId } = variables
      const data = { selectedProjectId: projectId }
      cache.writeData({ data })
      storage.save('selectedProjectId', projectId)
      return null
    }
  }
}
