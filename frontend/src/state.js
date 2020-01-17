import * as storage from './helpers/storage'

const token = storage.load('token')
const selectedProjectId = storage.load('selectedProjectId')

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
