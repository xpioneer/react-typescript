

export class Stock {
  id: number
  name: string
  code: string
  market: EMarket
  block: EBlock
  amount: number // 单手成交数量
}

export enum EMarket {
  上证 = 1,
  深证
}

export type KeyofMarket = keyof typeof EMarket
export const marketOpts = () => Object.keys(EMarket).filter(k => isNaN(+k)).map<IOption<EMarket, KeyofMarket>>((k: KeyofMarket) => {
  return {
    label: k,
    value: EMarket[k]
  }
})

export enum EBlock {
  主板 = 1,
  创业板,
  科创板
}

export type KeyofBlock = keyof typeof EBlock
export const blockOpts = () => Object.keys(EBlock).filter(k => isNaN(+k)).map<IOption<EBlock, KeyofBlock>>((k: KeyofBlock) => {
  return {
    label: k,
    value: EBlock[k]
  }
})