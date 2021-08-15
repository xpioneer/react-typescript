import $http from '@utils/http'
import { pageData2Params } from '@utils/tools'
import { Stock } from 'types/stock'


export type StockQuery = Omit<Stock & IPageParams, 'id' | 'amount'>

export const stockPageList = (params: Partial<StockQuery> = pageData2Params()) => {
  return $http.get<any, IPageData<Stock>>('/api/stocks', { params })
}