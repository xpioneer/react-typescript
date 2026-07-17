import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Flex, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { getStockData, getStrategyCompareData, getStrategyData, QuantData } from '@/services/quant'
import * as Echarts from 'echarts/core'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DataZoomComponent,
  LegendComponent,
} from 'echarts/components'
import { CandlestickChart, LineChart, BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import {
  StrategyCompareItem,
  StrategyData,
  Stock,
  Strategy,
  strategyReverse,
  Trade,
  TradeType,
  tradeTypeRev,
} from '@/types/quant'
import { DateFormat } from '@/types/base'
import { dateFormat } from '@/utils/tools'

Echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DataZoomComponent,
  LegendComponent,
  CandlestickChart,
  LineChart,
  BarChart,
  CanvasRenderer,
])

enum Colors {
  Red = '#e7322f',
  Green = '#26a69a',
  Orange = '#ff9800',
}

const commonDateFormat = (date: string) => dateFormat(date, DateFormat.Date)
const commonRender = (value: number) => Number(value).toFixed(2)

export const useStock = () => {
  const chartRef = useRef<HTMLDivElement>(null)

  const [symbol, setSymbol] = useState(Stock.美的集团)
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    new Date('2024-01-01'),
    new Date(),
  ])
  const [loading, setLoading] = useState(false)
  const [rows, setRows] = useState<QuantData[]>([])
  const [open, setOpen] = useState(false)
  const [open1, setOpen1] = useState(false)
  const [size, setSize] = useState(900)
  const [strategy, setStrategy] = useState(Strategy.MACross)
  const [strategyData, setStrategyData] = useState<StrategyData | undefined>(undefined)
  const [compareData, setCompareData] = useState<StrategyCompareItem[]>([])
  const [compareLoading, setCompareLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getStockData({
      symbol,
      startDate: dateRange[0] ? dateFormat(dateRange[0], DateFormat.yyyyMMdd) : '20210101',
      endDate: dateRange[1]
        ? dateFormat(dateRange[1], DateFormat.yyyyMMdd)
        : dateFormat(new Date(), DateFormat.yyyyMMdd),
    })
      .then(({ rows }) => {
        setRows(
          (rows ?? []).map((i) => ({
            ...i,
            // date: dateFormat(new Date(i.date), DateFormat.yyyyMMdd),
          })),
        )
      })
      .finally(() => setLoading(false))
  }, [symbol, dateRange])

  useEffect(() => {
    getStrategyData({
      strategy_type: strategy,
      symbol,
      startDate: dateRange[0] ? dateFormat(dateRange[0], DateFormat.yyyyMMdd) : '20210101',
      endDate: dateRange[1]
        ? dateFormat(dateRange[1], DateFormat.yyyyMMdd)
        : dateFormat(new Date(), DateFormat.yyyyMMdd),
    }).then(setStrategyData)
  }, [strategy, symbol, dateRange])

  useEffect(() => {
    setCompareLoading(true)
    getStrategyCompareData({
      symbol,
      start_date: dateRange[0] ? dateFormat(dateRange[0], DateFormat.yyyyMMdd) : '20210101',
      end_date: dateRange[1]
        ? dateFormat(dateRange[1], DateFormat.yyyyMMdd)
        : dateFormat(new Date(), DateFormat.yyyyMMdd),
      initial_capital: 100000,
    })
      .then(setCompareData)
      .finally(() => setCompareLoading(false))
  }, [strategy, symbol, dateRange])

  useEffect(() => {
    if (!chartRef.current || rows.length === 0) {
      return
    }

    const chart = Echarts.init(chartRef.current)
    // 20260710
    const dates = rows.map((item) => dateFormat(new Date(item.date), DateFormat.yyyyMMdd))
    const candles = rows.map((item) => [item.open, item.close, item.low, item.high])
    const closes = rows.map((item) => item.close)
    const volumes = rows.map((item) => item.volume)

    // K 线颜色也改成"收盘价比前一天高 → 红，否则绿"
    const candleColors = rows.map((item, index) => {
      if (index === 0) return Colors.Red
      return item.close > rows[index - 1].close ? Colors.Red : Colors.Green
    })

    const calcMA = (period: number) => {
      const result: (number | null)[] = []
      for (let i = 0; i < closes.length; i += 1) {
        if (i < period - 1) {
          result.push(null)
          continue
        }
        const slice = closes.slice(i - period + 1, i + 1)
        const sum = slice.reduce((acc, cur) => acc + cur, 0)
        result.push(Number((sum / period).toFixed(2)))
      }
      return result
    }

    const ma5 = calcMA(5)
    const ma10 = calcMA(10)
    const ma20 = calcMA(20)

    // ===== 信号点 =====
    const signalPoints = [] as Array<{
      name: string
      value: number
      xAxis: string
      yAxis: number
      itemStyle: any
    }>
    for (let i = 1; i < closes.length; i += 1) {
      if (ma5[i - 1] !== null && ma10[i - 1] !== null && ma5[i] !== null && ma10[i] !== null) {
        const prevShort = ma5[i - 1] as number
        const prevLong = ma10[i - 1] as number
        const currShort = ma5[i] as number
        const currLong = ma10[i] as number
        if (prevShort <= prevLong && currShort > currLong) {
          signalPoints.push({
            name: '买入',
            value: closes[i],
            xAxis: dates[i],
            yAxis: rows[i].low * 0.98,
            itemStyle: { color: Colors.Red },
          })
        }
        if (prevShort >= prevLong && currShort < currLong) {
          signalPoints.push({
            name: '卖出',
            value: closes[i],
            xAxis: dates[i],
            yAxis: rows[i].high * 1.02,
            itemStyle: { color: Colors.Green },
          })
        }
      }
    }

    // ===== 资金曲线数据 =====
    const equityCurve = strategyData?.equityCurve ?? []
    const equityValues = equityCurve.map((item) => item.portfolioValue)

    chart.setOption({
      // title: {
      //   text: `${symbol} K线策略图`,
      //   left: 'center',
      // },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
      },
      legend: {
        data: ['K线', 'MA5', 'MA10', 'MA20', '成交量', '资金曲线'],
        top: 30,
      },
      grid: [
        { left: '6%', right: '8%', top: '20%', bottom: '35%' },
        { left: '6%', right: '8%', top: '75%', bottom: '5%' },
      ],
      xAxis: [
        {
          type: 'category',
          data: dates,
          boundaryGap: true,
          gridIndex: 0,
          axisLabel: {
            rotate: 25,
            interval: 'preserveStartEnd',
          },
        },
        {
          type: 'category',
          data: dates,
          gridIndex: 1,
          axisLabel: { show: false },
        },
      ],
      yAxis: [
        {
          type: 'value',
          name: '价格',
          gridIndex: 0,
          scale: true,
        },
        {
          type: 'value',
          name: '成交量',
          gridIndex: 1,
          scale: true,
        },
        {
          type: 'value',
          name: '资产(元)',
          gridIndex: 0,
          scale: true,
          splitLine: { show: false }, // 不显示分割线，避免干扰
          axisLabel: {
            formatter: (value: number) => {
              if (value >= 10000) {
                return (value / 10000).toFixed(1) + '万'
              }
              return value.toFixed(0)
            },
          },
        },
      ],
      dataZoom: [
        { type: 'inside', start: 0, end: 100 },
        { type: 'slider', show: true, xAxisIndex: [0, 1], top: '10%', start: 0, end: 100 },
      ],
      series: [
        {
          name: 'K线',
          type: 'candlestick',
          data: candles,
          itemStyle: {
            color: Colors.Red,
            color0: Colors.Green,
            borderColor: Colors.Red,
            borderColor0: Colors.Green,
          },
          markPoint: {
            label: { formatter: '{b}' },
            data: signalPoints,
          },
        },
        {
          name: 'MA5',
          type: 'line',
          data: ma5,
          smooth: true,
          lineStyle: { opacity: 0.9, width: 1 },
          itemStyle: { color: '#f4c542' },
        },
        {
          name: 'MA10',
          type: 'line',
          data: ma10,
          smooth: true,
          lineStyle: { opacity: 0.9, width: 1 },
          itemStyle: { color: '#42a5f5' },
        },
        {
          name: 'MA20',
          type: 'line',
          data: ma20,
          smooth: true,
          lineStyle: { opacity: 0.9, width: 1 },
          itemStyle: { color: '#9c27b0' },
        },
        {
          name: '成交量',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: volumes,
          itemStyle: {
            color: (params: any) => {
              return candleColors[params.dataIndex]
            },
          },
        },
        // ===== 资金曲线（右侧Y轴）=====
        {
          name: '资金曲线',
          type: 'line',
          data: equityValues,
          smooth: true,
          yAxisIndex: 2, // 使用第三个 Y 轴（右侧）
          lineStyle: {
            width: 2,
            color: Colors.Orange,
          },
          itemStyle: { color: Colors.Orange },
          areaStyle: {
            color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(255, 152, 0, 0.3)' },
              { offset: 1, color: 'rgba(255, 152, 0, 0.05)' },
            ]),
          },
          connectNulls: true,
        },
      ],
    })

    const resizeChart = () => chart.resize()
    window.addEventListener('resize', resizeChart)

    return () => {
      window.removeEventListener('resize', resizeChart)
      chart.dispose()
    }
  }, [rows, strategyData])

  const summary = useMemo(() => {
    if (!rows.length) {
      return { latest: null, change: null, volume: 0, amount: 0 }
    }

    const latest = rows[rows.length - 1]
    const prev = rows[rows.length - 2] ?? latest
    const change = ((latest.close - prev.close) / prev.close) * 100

    return {
      latest,
      change,
      volume: latest.volume,
      amount: latest.amount,
    }
  }, [rows])

  const tradeMap = useMemo(() => {
    const map = new Map<string, Trade>()
    strategyData?.tradeList?.forEach((trade) => {
      map.set(trade.date, trade)
    })
    return map
  }, [strategyData?.tradeList])

  const columns: ColumnsType<QuantData> = [
    { title: '日期', dataIndex: 'date', render: commonDateFormat },
    { title: '开盘', dataIndex: 'open', },
    { title: '最高', dataIndex: 'high', },
    { title: '最低', dataIndex: 'low', },
    { title: '收盘', dataIndex: 'close', },
    { title: '成交量', dataIndex: 'volume', },
    {
      title: '涨跌幅',
      dataIndex: 'pctChange',
      render: (value) => (
        <span style={{ color: value > 0 ? Colors.Red : value === 0 ? '#555' : Colors.Green }}>
          {value}
        </span>
      ),
    },
  ]

  const equityCurveColumns: ColumnsType<StrategyData['equityCurve'][0]> = [
    {
      title: '日期',
      dataIndex: 'date',
      width: 120,
      render: (value: string) => value || '—',
    },
    {
      title: '是否交易',
      key: 'trade',
      width: 180,
      align: 'center',
      render: (value, data) => {
        const item = tradeMap.get(data.date)
        const isBuy = item?.type === TradeType.Buy
        return item ? (
          <Flex>
            <Tag color={isBuy ? 'red' : 'green'}>
              {tradeTypeRev[item.type]}
              <span>
                (交易价格:{item.execPrice}, 发生金额:{isBuy ? item.totalCost : item.totalRevenue})
              </span>
            </Tag>
          </Flex>
        ) : (
          '-'
        )
      },
    },
    {
      title: '持仓(股)',
      dataIndex: 'position',
    },
    {
      title: '净值 / 资金曲线',
      dataIndex: 'portfolioValue',
      align: 'right',
      render: commonRender,
    },
    {
      title: '现金',
      dataIndex: 'cash',
      align: 'right',
      render: commonRender,
    },
  ]

  const equityCurveData = useMemo(() => {
    if (!strategyData?.equityCurve?.length) {
      return []
    }

    return strategyData.equityCurve.map((item) => ({
      ...item,
      date: item.date ? commonDateFormat(item.date) : '—',
    }))
  }, [strategyData])

  const compareTableData = useMemo(() => {
    if (!compareData) {
      return []
    }

    return compareData.map(({ strategy, ...item }) => ({
      key: strategy,
      strategy: strategy,
      totalReturn: item.totalReturn ?? 0,
      sharpeRatio: item.sharpeRatio ?? 0,
      maxDrawdown: item.maxDrawdown ?? 0,
      totalTrades: item.totalTrades ?? 0,
      error: item.error,
    }))
  }, [compareData])

  const compareColumns: ColumnsType<any> = [
    {
      title: '策略',
      dataIndex: 'strategy',
      render: (value: Strategy, record) =>
        record.error ? <span style={{ color: '#cf1322' }}>{value}</span> : strategyReverse[value],
    },
    {
      title: '总收益率(%)',
      dataIndex: 'totalReturn',
      render: (value: number) => (
        <span style={{ color: value > 0 ? '#cf1322' : '#52c41a' }}>{value}</span>
      ),
    },
    {
      title: '夏普比率',
      dataIndex: 'sharpeRatio',
      render: commonRender,
    },
    {
      title: '最大回撤(%)',
      dataIndex: 'maxDrawdown',
      render: commonRender,
    },
    {
      title: '总交易次数',
      dataIndex: 'totalTrades',
    },
  ]

  return {
    chartRef,
    symbol,
    setSymbol,
    dateRange,
    setDateRange,
    loading,
    rows,
    open,
    setOpen,
    open1,
    setOpen1,
    size,
    setSize,
    strategy,
    setStrategy,
    strategyData,
    compareLoading,
    summary,
    columns,
    equityCurveColumns,
    equityCurveData,
    compareTableData,
    compareColumns,
  }
}
