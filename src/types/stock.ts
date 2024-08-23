

export class Stock {
  id: number
  name: string
  code: string
  market: EMarket
  block: EBlock
  amount: number // 单手成交数量

  // 最后交易时间
  lastestTradeAt: number
}

export enum EMarket {
  上证 = 1,
  深证
}

export type KeyofMarket = keyof typeof EMarket

export enum EBlock {
  主板 = 1,
  创业板,
  科创板
}

export type KeyofBlock = keyof typeof EBlock


export type StockQuery = Omit<Stock & IPageParams, 'amount'>

export type StockStats = {
  total: number
  block: EBlock
}
