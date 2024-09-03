// import $http from '@utils/http'
import { pageData2Params } from '@utils/tools'
import { StockQuery } from 'types/stock'
import { StockHistory } from 'types/stockHistory'
import { useRequest } from './http'

export const stockHistoryPageList = (params: Partial<StockQuery> = pageData2Params()) => {
  return useRequest<StockHistory, true>('/stockhistory', params)
  // return $http.get<any, IPageData<StockHistory>>('/api/stockhistory', { params })
}

export const stockHistoryTotal = () => {
  return useRequest<number>('/stockhistory/total')
  // return $http.get<any, IResponseData<number>>('/api/stockhistory/total').then(res => res.data)
}

export const stockHistoryList = (data = {}) => {
  return useRequest<StockHistory, true>('/stockline', data)
  // return useRequest<StockHistory, boolean>('/stockline', data).then(res => res.data)
}