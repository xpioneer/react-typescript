import { Method } from '@/types/demo'
import { pageData2Params } from '@utils/tools'
import { StockStats, Stock } from 'types/stock'
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
}

type QuantKLineData<T = unknown> = {
  period: string
  rows: T[]
  symbol: string
}

export const getStockData = ({ symbol, ...restParams }: QuantQuery) => {
  return useQuantRequest<QuantKLineData<QuantData>>(`/market/kline/${symbol}`, restParams)
}
