import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Card, Col, Drawer, Row, Select, Spin, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { getStockData } from '@/services/quant'
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

const StockQuantPage: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null)

  const [symbol, setSymbol] = useState('000333')
  const [loading, setLoading] = useState(false)
  const [rows, setRows] = useState<KlinePoint[]>([])
  const [open, setOpen] = useState(false)
  const [size, setSize] = useState(900)

  useEffect(() => {
    setLoading(true)
    getStockData({
      symbol,
      startDate: '20260603',
      endDate: '20260703',
    }).then(({ rows }) => {
      setRows(rows ?? [])
    }).finally(() => setLoading(false))
  }, [symbol])

  useEffect(() => {
    if (!chartRef.current || rows.length === 0) {
      return
    }

    const chart = Echarts.init(chartRef.current)
    const dates = rows.map((item) => item.date)
    const candles = rows.map((item) => [item.open, item.close, item.low, item.high])
    const closes = rows.map((item) => item.close)
    const volumes = rows.map((item) => item.volume)

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
            itemStyle: { color: '#26a69a' },
          })
        }
        if (prevShort >= prevLong && currShort < currLong) {
          signalPoints.push({
            name: '卖出',
            value: closes[i],
            xAxis: dates[i],
            yAxis: rows[i].high * 1.02,
            itemStyle: { color: '#ef5350' },
          })
        }
      }
    }

    chart.setOption({
      title: {
        text: 'AAPL K线策略图',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
      },
      legend: {
        data: ['K线', 'MA5', 'MA10', 'MA20', '成交量'],
        top: 30,
      },
      grid: [
        { left: '6%', right: '3%', top: '20%', bottom: '35%' },
        { left: '6%', right: '3%', top: '75%', bottom: '5%' },
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
        { type: 'value', name: '价格', gridIndex: 0, scale: true },
        { type: 'value', name: '成交量', gridIndex: 1, scale: true },
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
            color: '#ef5350',
            color0: '#26a69a',
            borderColor: '#ef5350',
            borderColor0: '#26a69a',
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
          itemStyle: { color: '#91caff' },
        },
      ],
    })

    const resizeChart = () => chart.resize()
    window.addEventListener('resize', resizeChart)

    return () => {
      window.removeEventListener('resize', resizeChart)
      chart.dispose()
    }
  }, [rows])

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
    { title: '收盘', dataIndex: 'close', key: 'close', render: (value) => Number(value).toFixed(2) },
    { title: '成交量', dataIndex: 'volume', key: 'volume', render: (value) => Number(value).toLocaleString() },
  ]

  return (
    <div className={styles.quantContainer}>
      <Card title="单只股票量化分析" style={{ marginBottom: 16 }}>
        <Row gutter={16} align="middle">
          <Col span={6}>
            <Select value={symbol} onChange={setSymbol} style={{ width: '100%' }}>
              <Select.Option value="AAPL">AAPL</Select.Option>
              <Select.Option value="MSFT">MSFT</Select.Option>
              <Select.Option value="TSLA">TSLA</Select.Option>
              <Select.Option value="000333">000333</Select.Option>
            </Select>
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
          dataSource={rows.slice(-10).reverse()}
          rowKey="date"
          pagination={false}
          size="small"
        />
      </Drawer>
    </div>
  )
}

export default StockQuantPage
