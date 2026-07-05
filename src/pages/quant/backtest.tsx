import React from 'react'
import { Card, Col, Row, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import styles from './style.module.scss'

interface BacktestRow {
  key: string
  name: string
  period: string
  winRate: number
  profit: number
  maxDrawdown: number
  status: '运行中' | '已完成'
}

const dataSource: BacktestRow[] = [
  { key: '1', name: '双均线策略', period: '2024-01-01 ~ 2024-06-30', winRate: 62.5, profit: 28.3, maxDrawdown: 8.2, status: '已完成' },
  { key: '2', name: 'MACD 交叉', period: '2024-02-01 ~ 2024-06-30', winRate: 58.2, profit: 15.6, maxDrawdown: 12.1, status: '运行中' },
  { key: '3', name: 'RSI 超买超卖', period: '2024-03-01 ~ 2024-06-30', winRate: 55.8, profit: 12.4, maxDrawdown: 15.3, status: '已完成' },
]

const BacktestPage: React.FC = () => {
  const columns: ColumnsType<BacktestRow> = [
    { title: '策略名称', dataIndex: 'name', key: 'name' },
    { title: '回测区间', dataIndex: 'period', key: 'period' },
    { title: '胜率', dataIndex: 'winRate', key: 'winRate', render: (value) => `${value}%` },
    { title: '收益率', dataIndex: 'profit', key: 'profit', render: (value) => `${value}%` },
    { title: '最大回撤', dataIndex: 'maxDrawdown', key: 'maxDrawdown', render: (value) => `${value}%` },
    { title: '状态', dataIndex: 'status', key: 'status', render: (value) => <Tag color={value === '运行中' ? 'green' : 'blue'}>{value}</Tag> },
  ]

  return (
    <div className={styles.quantContainer}>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Card title="总回测次数">3</Card>
        </Col>
        <Col span={8}>
          <Card title="平均收益率">+18.8%</Card>
        </Col>
        <Col span={8}>
          <Card title="平均回撤">11.9%</Card>
        </Col>
      </Row>

      <Card title="策略回测结果">
        <Table columns={columns} dataSource={dataSource} pagination={false} />
      </Card>
    </div>
  )
}

export default BacktestPage
