import * as LocalData from '../LocalData'

const localySavedProjectId = LocalData.load('selectedProjectId')

const defaults = {
  selectedProjectId: localySavedProjectId
}

const selectProject = (_, {projectId}, {cache}) => {
  LocalData.save('selectedProjectId', projectId)

  cache.writeData({
    data: {
      selectedProjectId: projectId
    }
  })

  return null
}

export default {
  defaults,
  resolvers: {
    Mutation: {
      selectProject
    }
  }
}
