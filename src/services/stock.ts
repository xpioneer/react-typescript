import $http from '@utils/http'
import { pageData2Params } from '@utils/tools'
import { Stock } from 'types/stock'

export interface IStockQuery extends IPageParams {
  code: string
  name: string
  market: string
  block: number
}

export const stockPageList = (params: Partial<IStockQuery> = pageData2Params()) => {
  return $http.get<any, IPageData<Stock>>('/api/stocks', { params })
}