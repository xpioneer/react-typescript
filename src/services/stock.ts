import $http from '@utils/http'
import { pageData2Params } from '@utils/tools'
import { EBlock, Stock } from 'types/stock'


export type StockQuery = Omit<Stock & IPageParams, 'id' | 'amount'> & { noPage: boolean }

export const stockPageList = (params: Partial<StockQuery> = pageData2Params()) => {
  return $http.get<any, IPageData<Stock>>('/api/stocks', { params })
}

export const getStockDetail = (id: number) => {
  return $http.get<any, IResponseData<Stock>>(`/api/stocks/${id}`).then(res => res.data)
}


export const getStockChartCount = () => {
  return $http.get<{total: number, block: EBlock}[]>('/api/stock/chartCount').then(res => res.data)
}