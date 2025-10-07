

export class Stock {
  id: number
  name: string
  code: string
  market: Market
  block: Board
  amount: number // 单手成交数量

  // 最后交易时间
  lastestTradeAt: number
}

export enum Market {
  上证 = 1,
  深证
}

export type KeyofMarket = keyof typeof Market

export enum Board {
  主板 = 1,
  创业板,
  科创板
}

export type KeyofBlock = keyof typeof Board


export type StockQuery = Omit<Stock & IPageParams, 'amount'>

export type StockStats = {
  total: number
  block: Board
}
