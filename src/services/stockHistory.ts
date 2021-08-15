import $http from '@utils/http'
import { pageData2Params } from '@utils/tools'
import { Stock } from 'types/stock'
import { StockHistory } from 'types/stockHistory'


export type StockQuery = Omit<Stock & IPageParams, 'id' | 'amount'>

export const stockHistoryPageList = (params: Partial<StockQuery> = pageData2Params()) => {
  return $http.get<any, IPageData<StockHistory>>('/api/stockhistory', { params })
}