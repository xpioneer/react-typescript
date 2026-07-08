import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Button, Card, Col, Drawer, Row, Select, Spin, Table, Tag } from 'antd'
import { format } from 'date-fns'
import type { ColumnsType } from 'antd/es/table'
import { getStockData, getStrategyData } from '@/services/quant'
import styles from './style.module.scss'
import * as Echarts from 'echarts/core'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DataZoomComponent,
} from 'echarts/components'
import { CandlestickChart, LineChart, BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { object2Options } from '@/utils/tools'
import { StrategyData } from 'types/quant'
import { DatePicker } from '@/components/datePicker'

Echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DataZoomComponent,
  CandlestickChart,
  LineChart,
  BarChart,
  CanvasRenderer,
])

interface KlinePoint {
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

enum Stock {
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
}

const options = object2Options(Stock)

enum Strategy {
  MACross = 'ma_cross', // 双均线策略（趋势跟踪）
  MACD = 'macd', // MACD 策略（趋势跟踪）
  VWAP = 'vwap', // VWAP 策略（趋势跟踪）
  RSI = 'rsi', // RSI 策略（超买超卖）
  ZScore = 'z_score', // Z-Score 策略（均值回归）
  BollingerBands = 'bollinger_bands', // 布林带策略（均值回归）
  Turtle = 'turtle', // 海龟交易法则（突破策略）
  DoubleBottom = 'double_bottom', // 双底/双顶形态识别（形态学）
}

enum DateTime {
  yyyyMMdd = 'yyyyMMdd',
  yyyy_MM_dd = 'yyyy-MM-dd',
}

enum Colors {
  Red = '#ef5350',
  Green = '#26a69a',
}

const strategyOpts = object2Options(Strategy)

const StockQuantPage: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null)

  const [symbol, setSymbol] = useState(Stock.美的集团)
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([new Date('2024-07-01'), new Date])
  const [loading, setLoading] = useState(false)
  const [rows, setRows] = useState<KlinePoint[]>([])
  const [open, setOpen] = useState(false)
  const [size, setSize] = useState(900)
  const [strategy, setStrategy] = useState(Strategy.MACross)
  const [strategyData, setStrategyData] = useState<StrategyData | undefined>(undefined)
  const [open1, setOpen1] = useState(false)

  useEffect(() => {
    setLoading(true)
    getStockData({
      symbol,
      startDate: dateRange[0] ? format(dateRange[0], DateTime.yyyyMMdd) : '20210101',
      endDate: dateRange[1] ? format(dateRange[1], DateTime.yyyyMMdd) : format(new Date(), DateTime.yyyyMMdd),
    })
      .then(({ rows }) => {
        setRows(
          (rows ?? []).map((i: KlinePoint) => ({
            ...i,
            date: format(new Date(i.date), DateTime.yyyyMMdd),
          })),
        )
      })
      .finally(() => setLoading(false))
  }, [symbol, dateRange])

  useEffect(() => {
    getStrategyData({
      strategy_type: strategy,
      symbol,
      startDate: dateRange[0] ? format(dateRange[0], DateTime.yyyyMMdd) : '20210101',
      endDate: dateRange[1] ? format(dateRange[1], DateTime.yyyyMMdd) : format(new Date(),
      DateTime.yyyyMMdd)
    }).then(setStrategyData)
  }, [strategy, symbol, dateRange])

  useEffect(() => {
    if (!chartRef.current || rows.length === 0) {
      return
    }

    const chart = Echarts.init(chartRef.current)
    const dates = rows.map((item) => item.date)
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
    const equityDates = equityCurve.map((item) =>
      item.date ? format(new Date(item.date), DateTime.yyyyMMdd) : '',
    )
    const equityValues = equityCurve.map((item) => item.portfolioValue)

    chart.setOption({
      title: {
        text: `${symbol} K线策略图`,
        left: 'center',
      },
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
        { type: 'inside', start: 70, end: 100 },
        { type: 'slider', show: true, xAxisIndex: [0, 1], top: '92%', start: 70, end: 100 },
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
              console.log('params', params)
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
            color: '#ff9800',
          },
          itemStyle: { color: '#ff9800' },
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
      return { latest: null, change: null, volume: 0 }
    }

    const latest = rows[rows.length - 1]
    const prev = rows[rows.length - 2] ?? latest
    const change = ((latest.close - prev.close) / prev.close) * 100

    return {
      latest,
      change,
      volume: latest.volume,
    }
  }, [rows])

  const columns: ColumnsType<KlinePoint> = [
    { title: '日期', dataIndex: 'date', key: 'date' },
    { title: '开盘', dataIndex: 'open', key: 'open', render: (value) => Number(value).toFixed(2) },
    { title: '最高', dataIndex: 'high', key: 'high', render: (value) => Number(value).toFixed(2) },
    { title: '最低', dataIndex: 'low', key: 'low', render: (value) => Number(value).toFixed(2) },
    {
      title: '收盘',
      dataIndex: 'close',
      key: 'close',
      render: (value) => Number(value).toFixed(2),
    },
    {
      title: '成交量',
      dataIndex: 'volume',
      key: 'volume',
      render: (value) => Number(value).toLocaleString(),
    },
  ]

  const equityCurveColumns: ColumnsType<StrategyData['equityCurve'][0]> = [
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
      width: 120,
      render: (value: string) => value || '—',
    },
    {
      title: '是否交易',
      dataIndex: 'trade',
      key: 'trade',
      width: 120,
      align: 'center',
      render: (value: number, data) => {
        const item = strategyData?.trades?.find(
          (trade) => format(new Date(trade.date), 'yyyy-MM-dd') === data.date,
        )
        // return item ? item.type : '否'
        return item ? <Tag color={item.type === 'buy' ? 'red' : 'green'}>{item.type}</Tag> : '-'
      },
    },
    {
      title: '持仓',
      dataIndex: 'shares',
      key: 'shares',
      render: (value: number, data) => {
        const item = strategyData?.trades?.find(
          (trade) => format(new Date(trade.date), 'yyyy-MM-dd') <= data.date,
        )
        return item ? item.shares : 0
      },
    },

    {
      title: '净值 / 资金曲线',
      dataIndex: 'portfolioValue',
      key: 'portfolioValue',
      render: (value: number) => Number(value).toFixed(2),
    },
  ]

  const equityCurveData = useMemo(() => {
    if (!strategyData?.equityCurve?.length) {
      return []
    }

    return strategyData.equityCurve.map((item) => ({
      ...item,
      date: item.date ? format(new Date(item.date), 'yyyy-MM-dd') : '—',
    }))
  }, [strategyData])

  return (
    <div className={styles.quantContainer}>
      <Card title="单只股票量化分析" style={{ marginBottom: 16 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col span={6}>
            <Select
              value={symbol}
              onChange={setSymbol}
              style={{ width: '100%' }}
              options={options}
            />
          </Col>
          <Col span={6}>
            <div style={{ color: '#666' }}>
              最新收盘：{summary.latest ? Number(summary.latest.close).toFixed(2) : '—'}
            </div>
          </Col>
          <Col span={6}>
            <div style={{ color: summary.change && summary.change >= 0 ? '#52c41a' : '#cf1322' }}>
              日变动：{summary.change !== null ? `${summary.change.toFixed(2)}%` : '—'}
            </div>
          </Col>
          <Col span={6}>
            <Tag color="blue">成交量：{summary.volume ? summary.volume.toLocaleString() : '—'}</Tag>
          </Col>
          <Col span={6}>
            <Select
              value={strategy}
              onChange={setStrategy}
              style={{ width: '100%' }}
              options={strategyOpts}
            />
          </Col>
          <Col span={6}>
            <div
              style={{
                color:
                  strategyData?.totalReturn && strategyData?.totalReturn >= 0
                    ? '#cf1322'
                    : '#52c41a',
              }}
            >
              总收益率：{strategyData?.totalReturn}%
            </div>
          </Col>
          <Col span={6}>
            <div style={{ color: 'red' }}>最大回撤：{strategyData?.maxDrawdown}%</div>
          </Col>
          <Col span={6}>
            <Tag color="blue">夏普比率：{strategyData?.sharpeRatio}%</Tag>
          </Col>
          <Col span={6}>
            <Tag color="blue">总交易次数：{strategyData?.totalTrades}</Tag>
          </Col>
          <Col span={6}>
            <Tag color="blue">初始金额：{strategyData?.initialCapital}</Tag>
          </Col>
          <Col span={6}>
            <Tag color="blue">最终金额：{strategyData?.finalValue}</Tag>
          </Col>
          <Col span={6}>
            <Button type="primary" onClick={() => setOpen1(true)}>
              资金明细
            </Button>
          </Col>
          <Col span={6}>
            <DatePicker.RangePicker
              style={{ width: '100%' }}
              value={dateRange}
              onChange={(dates) => setDateRange(dates as [Date | null, Date | null])}
            />
          </Col>
        </Row>
      </Card>
      <Card title="K 线数据" extra={<a onClick={() => setOpen(true)}>查看表格</a>}>
        <div ref={chartRef} className={styles.chartBox} />
      </Card>

      <Drawer
        title={'table数据展示'}
        open={open}
        size={size}
        onClose={() => setOpen(false)}
        resizable={{
          onResize: (newSize) => setSize(newSize),
        }}
      >
        <Table
          loading={loading}
          columns={columns}
          dataSource={rows}
          rowKey="date"
          pagination={false}
          size="small"
        />
      </Drawer>
      <Drawer
        title={'资金明细'}
        placement="left"
        open={open1}
        size={size}
        onClose={() => setOpen1(false)}
        resizable={{
          onResize: (newSize) => setSize(newSize),
        }}
      >
        <div style={{ marginBottom: 12, color: '#666' }}>
          当前策略的资金曲线明细，展示每个时间点的净值变化。
        </div>
        <Table
          loading={loading}
          columns={equityCurveColumns}
          dataSource={equityCurveData}
          rowKey="date"
          pagination={false}
          size="small"
          scroll={{ x: 480 }}
        />
      </Drawer>
    </div>
  )
}

export default StockQuantPage
