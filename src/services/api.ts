import $http from '@utils/http'
import { pageData2Params } from '@utils/tools'
import { APILog, APIQuery } from 'types/api'
import { ErrorLog, ErrorQuery } from 'types/apiError'


export const getApiLogs = (params: APIQuery & IPageParams) => {
  return $http.get<any, IPageData<APILog>>('/api/log-api', { params })
}


export const getErrorLogs = (params: ErrorQuery & IPageParams) => {
  return $http.get<any, IPageData<ErrorLog>>('/api/log-errors', { params })
}
