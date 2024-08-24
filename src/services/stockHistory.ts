// import $http from '@utils/http'
import { pageData2Params } from '@utils/tools'
import { StockQuery } from 'types/stock'
import { StockHistory } from 'types/stockHistory'

export const stockHistoryPageList = (params: Partial<StockQuery> = pageData2Params()) => {
  return $http.get<any, IPageData<StockHistory>>('/api/stockhistory', { params })
}

export const stockHistoryTotal = () => {
  return $http.get<any, IResponseData<number>>('/api/stockhistory/total').then(res => res.data)
}