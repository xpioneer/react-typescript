import { Method } from '@/types/demo'
import { pageData2Params } from '@utils/tools'
import { StrategyCompareItem, StrategyData } from 'types/quant'
import { useQuantRequest } from './http'

export type QuantQuery = {
  symbol: string
  startDate: string
  endDate: string
}

export type QuantData = {
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
  symbol: string
  amount: number
  pctChange: number
}

type QuantKLineData<T = unknown> = {
  period: string
  rows: T[]
  symbol: string
}

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


