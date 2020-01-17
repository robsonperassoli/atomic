import {gql, useQuery} from '@apollo/client'

const SELECTED_PROJECT_QUERY = gql`
  {
    selectedProjectId @client
  }
`

function useSelectedProjectId() {
  const { data } = useQuery(SELECTED_PROJECT_QUERY)

  return data ? data.selectedProjectId : null
}

export default useSelectedProjectId
