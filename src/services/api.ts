// import $http from '@utils/http'
import { pageData2Params } from '@utils/tools'
import { APILog, APIQuery } from 'types/api'
import { ErrorLog, ErrorQuery } from 'types/apiError'
import { SystemLog } from 'types/geolog'
import { useRequest } from './http'
import { Method } from '@/types/demo'


export const getApiLogs = (params: APIQuery & IPageParams) => {
  return $http.get<any, IPageData<APILog>>('/api/log-api', { params })
}


export const getErrorLogs = (params: ErrorQuery & IPageParams) => {
  return $http.get<any, IPageData<ErrorLog>>('/api/log-errors', { params })
}


export const getGeologs = (params: any) => {
  return useRequest<SystemLog, true>('/log/geos', params, Method.GET)
}