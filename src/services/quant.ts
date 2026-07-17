import { Method } from '@/types/demo'
import { pageData2Params } from '@utils/tools'
import { StrategyCompareItem, StrategyData, QuantQuery, QuantData, QuantKLineData } from 'types/quant'
import { useQuantRequest } from './http'


export const getStockData = ({ symbol, ...restParams }: QuantQuery) => {
  return useQuantRequest<QuantKLineData<QuantData>>(`/market/stock/${symbol}`, restParams)
}

export const getStrategyData = (data: AnyObject) => {
  return useQuantRequest<StrategyData>(
    `/strategy/backtest`,
    data,
    Method.POST,
  )
}

export const getStrategyCompareData = (data: AnyObject) => {
  return useQuantRequest<StrategyCompareItem[]>(`/strategy/compare`, data, Method.POST)
}

export const getBTStrategies = (data: AnyObject) => {
  return useQuantRequest(`/backtest/bt`, data, Method.POST)
}


