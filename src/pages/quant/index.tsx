import React, { useEffect, useRef, useState } from 'react'
import { Row, Col, Card, Table, Button, Space, Select, DatePicker, Tag, Progress, Spin } from 'antd'
import { PlayCircleOutlined, BarChartOutlined, CheckCircleOutlined, WarningOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import type { ColumnsType } from 'antd/es/table'
import * as Echarts from 'echarts/core'
import { TitleComponent, TooltipComponent, GridComponent, DataZoomComponent } from 'echarts/components'
import { CandlestickChart, LineChart, BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import styles from './style.module.scss'
import { getStockData } from '@/services/quant'

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

interface Strategy {
  key: string
  name: string
  type: string
  status: 'active' | 'inactive' | 'testing'
  winRate: number
  profitRate: number
  maxDrawdown: number
  tradeCount: number
  updateTime: string
}

interface KlinePoint {
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

const { Option } = Select
const { RangePicker } = DatePicker

const mockStrategies: Strategy[] = [
  {
    key: '1',
    name: '双均线策略',
    type: '趋势跟踪',
    status: 'active',
    winRate: 62.5,
    profitRate: 28.3,
    maxDrawdown: 8.2,
    tradeCount: 156,
    updateTime: '2024-01-15 14:30',
  },
  {
    key: '2',
    name: 'MACD交叉策略',
    type: '技术指标',
    status: 'testing',
    winRate: 58.2,
    profitRate: 15.6,
    maxDrawdown: 12.1,
    tradeCount: 89,
    updateTime: '2024-01-14 10:15',
  },
  {
    key: '3',
    name: 'RSI超买超卖',
    type: '均值回归',
    status: 'inactive',
    winRate: 55.8,
    profitRate: 12.4,
    maxDrawdown: 15.3,
    tradeCount: 203,
    updateTime: '2024-01-12 16:45',
  },
  {
    key: '4',
    name: '布林带突破',
    type: '波动率',
    status: 'active',
    winRate: 65.1,
    profitRate: 35.2,
    maxDrawdown: 9.8,
    tradeCount: 128,
    updateTime: '2024-01-15 09:20',
  },
]

const QuantificationPage: React.FC<ICommonProps> = () => {
  const [selectedStrategy, setSelectedStrategy] = useState<string>('')
  const [klineData, setKlineData] = useState<KlinePoint[]>([])
  const [loadingKline, setLoadingKline] = useState(false)
  const chartRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchKlineData = async () => {
      setLoadingKline(true)
      try {
        const response = await getStockData({
              startDate: '2026-06-03',
              endDate: '2026-07-03',
              symbol: '000333',
        })
        setKlineData(response.rows ?? [])
      } catch (error) {
        setKlineData([])
      } finally {
        setLoadingKline(false)
      }
    }

    fetchKlineData()
  }, [])

  useEffect(() => {
    if (!chartRef.current || klineData.length === 0) {
      return
    }

    const chart = Echarts.init(chartRef.current)
    const dates = klineData.map((item) => item.date)
    const candles = klineData.map((item) => [item.open, item.close, item.low, item.high])
    const closes = klineData.map((item) => item.close)
    const volumes = klineData.map((item) => item.volume)

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

    const signalPoints = [] as Array<{ name: string; value: number; xAxis: string; yAxis: number; itemStyle: any }>
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
            yAxis: klineData[i].low * 0.98,
            itemStyle: { color: '#26a69a' },
          })
        }
        if (prevShort >= prevLong && currShort < currLong) {
          signalPoints.push({
            name: '卖出',
            value: closes[i],
            xAxis: dates[i],
            yAxis: klineData[i].high * 1.02,
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
  }, [klineData])

  const columns: ColumnsType<Strategy> = [
    {
      title: '策略名称',
      dataIndex: 'name',
      key: 'name',
      render: (_text, record) => (
        <Button type="link" size="small" onClick={() => setSelectedStrategy(record.key)}>
          {record.name}
        </Button>
      ),
    },
    {
      title: '策略类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = status === 'active' ? 'green' : status === 'testing' ? 'orange' : 'default'
        let icon = status === 'active' ? <CheckCircleOutlined /> : status === 'testing' ? <WarningOutlined /> : null
        return (
          <Tag color={color} icon={icon}>
            {status === 'active' ? '运行中' : status === 'testing' ? '测试中' : '已停用'}
          </Tag>
        )
      },
    },
    {
      title: '胜率',
      dataIndex: 'winRate',
      key: 'winRate',
      render: (rate) => `${rate}%`,
    },
    {
      title: '收益率',
      dataIndex: 'profitRate',
      key: 'profitRate',
      render: (rate) => <span style={{ color: rate > 0 ? '#3f8600' : '#cf1322' }}>{rate > 0 ? '+' : ''}{rate}%</span>,
    },
    {
      title: '最大回撤',
      dataIndex: 'maxDrawdown',
      key: 'maxDrawdown',
      render: (dd) => `${dd}%`,
    },
    {
      title: '交易次数',
      dataIndex: 'tradeCount',
      key: 'tradeCount',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" size="small">详情</Button>
          <Button type="link" size="small">回测</Button>
        </Space>
      ),
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success'
      case 'testing':
        return 'warning'
      default:
        return 'default'
    }
  }

  return (
    <div className={styles.quantContainer}>
      <Card style={{ marginBottom: 16 }}>
        <Space wrap>
          <Button type="primary" onClick={() => navigate('/quant/dashboard')}>Dashboard 介绍</Button>
          <Button onClick={() => navigate('/quant/stock')}>单只股票页面</Button>
          <Button onClick={() => navigate('/quant/backtest')}>策略回测页面</Button>
        </Space>
      </Card>

      <Row gutter={16} className={styles.headerRow}>
        <Col span={8}>
          <Card className={styles.statCard}>
            <div className={styles.statContent}>
              <span className={styles.statLabel}>策略总数</span>
              <span className={styles.statValue}>12</span>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card className={styles.statCard}>
            <div className={styles.statContent}>
              <span className={styles.statLabel}>运行中</span>
              <span className={styles.statValue} style={{ color: '#52c41a' }}>5</span>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card className={styles.statCard}>
            <div className={styles.statContent}>
              <span className={styles.statLabel}>总收益率</span>
              <span className={styles.statValue} style={{ color: '#52c41a' }}>+125.8%</span>
            </div>
          </Card>
        </Col>
      </Row>

      <Card className={styles.filterCard} title="数据筛选">
        <Row gutter={16}>
          <Col span={6}>
            <Select
              placeholder="选择策略"
              style={{ width: '100%' }}
              value={selectedStrategy}
              onChange={setSelectedStrategy}
            >
              <Option value="all">全部策略</Option>
              {mockStrategies.map(s => (
                <Option key={s.key} value={s.key}>{s.name}</Option>
              ))}
            </Select>
          </Col>
          <Col span={6}>
            <Select placeholder="选择市场" style={{ width: '100%' }}>
              <Option value="stock">A股</Option>
              <Option value="future">期货</Option>
              <Option value="crypto">加密货币</Option>
            </Select>
          </Col>
          <Col span={8}>
            <RangePicker style={{ width: '100%' }} />
          </Col>
          <Col span={4}>
            <Space>
              <Button type="primary" icon={<BarChartOutlined />}>查询</Button>
              <Button icon={<PlayCircleOutlined />}>回测</Button>
            </Space>
          </Col>
        </Row>
      </Card>

      <Card className={styles.klineCard} title="AAPL K线走势">
        {loadingKline ? (
          <div className={styles.chartPlaceholder}>
            <Spin description="正在加载行情数据..." />
          </div>
        ) : (
          <div ref={chartRef} className={styles.chartBox} />
        )}
      </Card>

      <Card className={styles.tableCard} title="策略列表">
        <Table columns={columns} dataSource={mockStrategies} />
      </Card>

      <Row gutter={16} className={styles.detailRow}>
        <Col span={12}>
          <Card title="策略表现" className={styles.chartCard}>
            <div className={styles.progressItem}>
              <div className={styles.progressHeader}>
                <span>总收益率</span>
                <span className={styles.progressValue}>125.8%</span>
              </div>
              <Progress percent={75} strokeColor="#52c41a" />
            </div>
            <div className={styles.progressItem}>
              <div className={styles.progressHeader}>
                <span>年化收益率</span>
                <span className={styles.progressValue}>42.3%</span>
              </div>
              <Progress percent={60} strokeColor="#1890ff" />
            </div>
            <div className={styles.progressItem}>
              <div className={styles.progressHeader}>
                <span>最大回撤</span>
                <span className={styles.progressValue}>-15.2%</span>
              </div>
              <Progress percent={25} strokeColor="#faad14" />
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="风险指标" className={styles.chartCard}>
            <div className={styles.riskItem}>
              <span className={styles.riskLabel}>夏普比率</span>
              <span className={styles.riskValue}>2.35</span>
            </div>
            <div className={styles.riskItem}>
              <span className={styles.riskLabel}>卡尔马比率</span>
              <span className={styles.riskValue}>3.12</span>
            </div>
            <div className={styles.riskItem}>
              <span className={styles.riskLabel}>索提诺比率</span>
              <span className={styles.riskValue}>2.89</span>
            </div>
            <div className={styles.riskItem}>
              <span className={styles.riskLabel}>信息比率</span>
              <span className={styles.riskValue}>1.78</span>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default QuantificationPage
