import { Method, APIType } from '@/types/demo'


/**
 * init GraphQL
 * @param query graphql query
 * @param data parameters
 * @returns Promise<IPageData<T> | T>
 */
export const useGraphQL = <T = any, IsPageData = null>(
  query: string,
  variables: AnyObject = {},
) => {
  return $http.post<any, GraphQLResponse<T, IsPageData>>(APIType.Graphql, {
    query,
    variables
  }).then(res => {
    return res.data
  })
}

/**
 * useRequest
 * @param url 剔除`/api`的url
 * @param data 请求参数，json格式
 * @param method http method， 默认为get
 * @returns T类型
 */
export const useRequest = <T = any, PageData = null>(
  url: string,
  data?: AnyObject,
  method = Method.GET,
) => {
  const isGetMethod = method === Method.GET
  return $http<any, IResponseData<PageData extends true ? IPageData<T> : T>>({
    baseURL: APIType.RESTful,
    url,
    method,
    data: isGetMethod ? null : data,
    params: isGetMethod ? data : null
  }).then(res => res.data)
}