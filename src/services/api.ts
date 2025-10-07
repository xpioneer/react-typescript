import { pageData2Params } from '@utils/tools'
import { APILog, APIQuery } from 'types/api'
import { ErrorLog, ErrorQuery } from 'types/apiError'
import { useRequest } from './http'
import { StatsData } from '@/types/dashboard'


export const getMongoLogsStats = () => {
  return useRequest<StatsData>('/log/stats').then(r => r.data)
}


export const getApiLogs = (params: APIQuery & IPageParams) => {
  return useRequest<APILog, true>('/log-api', { params })
}


export const getErrorLogs = (params: ErrorQuery & IPageParams) => {
  return useRequest<ErrorLog, true>('/log-errors', { params })
}

