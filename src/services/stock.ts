import $http from '@utils/http'
import { pageData2Params } from '@utils/tools'
import { StockStats, Stock } from 'types/stock'


export type StockQuery = Omit<Stock & IPageParams, 'id' | 'amount'> & { noPage: boolean }

export const stockPageList = (params: Partial<StockQuery> = pageData2Params()) => {
  return $http.get<any, IPageData<Stock>>('/api/stocks', { params })
    .then(res => {
      console.log('get:', res)
      return res
    })
}

export const getStockDetail = (id: number) => {
  return $http.get<any, IResponseData<Stock>>(`/api/stocks/${id}`).then(res => res.data)
}


export const getStockChartCount = () => {
  return $http.get<StockStats[]>('/api/stock/chartCount').then(res => res.data)
}