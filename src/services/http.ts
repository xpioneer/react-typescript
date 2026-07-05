import { Method, APISource } from '@/types/demo'
import { $http } from '@/utils/http'


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
  return $http.post<any, GraphQLResponse<T, IsPageData>>(APISource.Graphql, {
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
  return $http<any, PageData extends true ? IPageData<T> : IResponseData<T>>({
    baseURL: APISource.RESTful,
    url,
    method,
    data: isGetMethod ? null : data,
    params: isGetMethod ? data : null
  })
}

/**
 * 专门给 Python 量化交易项目用的统一请求
 * @param url 剔除 `/py-api/api/v1` 的路径
 * @param data 请求参数
 * @param method HTTP 方法
 * @returns 响应数据
 */
export const useQuantRequest = <T = any>(
  url: string,
  data?: AnyObject,
  method = Method.GET,
) => {
  const isGetMethod = method === Method.GET
  return $http<any, IResponseData<T>>({
    baseURL: APISource.Quantification,
    url: `/api/v1${url}`,
    method,
    data: isGetMethod ? null : data,
    params: isGetMethod ? data : null,
  }).then(res => res.data)
}
