import { GRAPHQL_API } from 'constants/index'

/**
 * init GraphQL
 * @param query graphql query
 * @param data parameters
 * @returns Promise<IPageData<T> | T>
 */
export const useGraphQL = <Key extends string, T = any, IsPageData = null>(
  query: string,
  data: AnyObject,
) => {
  return $http.post<any, GraphQLResponse<Key, T, IsPageData>>(GRAPHQL_API, {
    query,
    variables: data
  }).then(res => {
    const keys = Object.keys(res.data) as Key[]
    return res.data[keys[0]]
  })
}