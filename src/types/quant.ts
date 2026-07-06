
export interface StrategyResult {
  initialCapital: number
  finalValue: number
  totalReturn: number
  sharpeRatio: number
  maxDrawdown: number
  totalTrades: number
}

interface Trade {
  date: string
  type: string
  price: number
  shares: number
  cost: number
  cashAfter: number
}

interface EquityPoint {
  date: string
  portfolioValue: number
}

export interface StrategyData extends StrategyResult {
  trades: Trade[]
  equityCurve: EquityPoint[]
}