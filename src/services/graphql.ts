import { GRAPHQL_API } from 'constants/index'

/**
 * init GraphQL
 * @param query graphql query
 * @param data parameters
 * @returns Promise<IPageData<T> | T>
 */
export const useGraphQL = <T = any, IsPageData = null>(
  query: string,
  data: AnyObject,
) => {
  console.log(data, ">>>gql")
  return $http.post<any, GraphQLResponse<T, IsPageData>>(GRAPHQL_API, {
    query,
    variables: data
  }).then(res => {
    const keys = Object.keys(res.data)
    return res.data[keys[0]]
  })
}