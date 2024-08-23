import $http from '@utils/http'
import { pageData2Params } from '@utils/tools'
import { APILog, APIQuery } from 'types/api'


export const getApiLogs = (params: APIQuery & IPageParams) => {
  return $http.get<any, IPageData<APILog>>('/api/log-api', { params })
}
