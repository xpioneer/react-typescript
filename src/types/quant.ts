import { object2Options } from '@/utils/tools'

export enum Stock {
  Apple = 'AAPL',
  Microsoft = 'MSFT',
  Google = 'GOOGL',
  Tesla = 'TSLA',
  NVDA = 'NVDA',
  美的集团 = '000333',
  贵州茅台 = '600519',
  中际旭创 = '300308',
  宁德时代 = '300750',
  中信证券 = '600030',
  药明康德 = '603259',
  格力电器 = '000651',
}

export const stockOpts = object2Options(Stock)
export const stockReverse = reverse(Stock)

export enum Strategy {
  MACross = 'ma_cross', // 双均线策略（趋势跟踪）
  MACD = 'macd', // MACD 策略（趋势跟踪）
  VWAP = 'vwap', // VWAP 策略（趋势跟踪）
  RSI = 'rsi', // RSI 策略（超买超卖）
  ZScore = 'z_score', // Z-Score 策略（均值回归）
  BollingerBands = 'bollinger_bands', // 布林带策略（均值回归）
  Turtle = 'turtle', // 海龟交易法则（突破策略）
  DoubleBottom = 'double_bottom', // 双底/双顶形态识别（形态学）
}

export const strategyOpts = object2Options(Strategy)

export interface StrategyResult {
  initialCapital: number
  finalValue: number
  totalReturn: number
  sharpeRatio: number
  maxDrawdown: number
  totalTrades: number
}

export enum TradeType {
  Buy = 'buy',
  Sell = 'sell'
}

export interface Trade {
  execPrice: number
  totalCost: number
  totalRevenue: number
  date: string
  type: TradeType
  shares: number
}
export const tradeTypeRev = reverse(TradeType)

interface EquityPoint {
  date: string
  portfolioValue: number
}

export interface StrategyData extends StrategyResult {
  tradeList: Trade[]
  equityCurve: EquityPoint[]
}

export interface StrategyCompareItem {
  strategy: string
  totalReturn?: number
  sharpeRatio?: number
  maxDrawdown?: number
  totalTrades?: number
  error?: string
}

// 自动生成反转映射类型
type Reverse<T extends Record<string, string | number>> = {
  [K in keyof T as T[K]]: K;
};


function reverse<T extends Record<string, string | number>>(obj: T): Reverse<T> {
  return Object.fromEntries(Object.entries(obj).map(([key, value]) => [value, key])) as {
    [K in keyof T as T[K]]: K
  }
}

export const strategyReverse = reverse(Strategy)
