import React from 'react'
import { Card, Col, List, Row, Statistic, Tag, Timeline } from 'antd'
import {
  AreaChartOutlined,
  BarChartOutlined,
  CheckCircleOutlined,
  RocketOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons'
import styles from './style.module.scss'

const QuantDashboardPage: React.FC = () => {
  const workflow = [
    '接入 AKShare 等行情数据源',
    '清洗并生成 K 线、均线与成交量信号',
    '配置策略规则并执行回测',
    '查看绩效报告与风控指标',
  ]

  const highlights = [
    { title: '实时行情', value: 'K 线 / 成交量 / 均线', icon: <AreaChartOutlined /> },
    { title: '策略回测', value: '多策略对比 / 收益 / 回撤', icon: <BarChartOutlined /> },
    { title: '风控模块', value: '止损、仓位、风险指标', icon: <SafetyCertificateOutlined /> },
  ]

  return (
    <div className={styles.quantContainer}>
      <Row gutter={16} className={styles.headerRow}>
        <Col span={8}>
          <Card>
            <Statistic title="策略总数" value={12} prefix={<RocketOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="运行中" value={5} valueStyle={{ color: '#52c41a' }} prefix={<CheckCircleOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="累计收益率" value={125.8} precision={1} suffix="%" valueStyle={{ color: '#52c41a' }} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={16}>
          <Card title="量化系统介绍" style={{ marginBottom: 16 }}>
            <p>本模块提供一套面向量化交易的工作流，覆盖行情接入、指标计算、策略回测和结果展示。</p>
            <p>你可以在这里查看单只股票的价格结构，也可以快速切换到策略回测页面，进行收益和回撤分析。</p>
            <div style={{ marginTop: 12 }}>
              <Tag color="blue">K线</Tag>
              <Tag color="green">均线</Tag>
              <Tag color="orange">回测</Tag>
              <Tag color="purple">风控</Tag>
            </div>
          </Card>

          <Card title="功能亮点">
            <Row gutter={16}>
              {highlights.map((item) => (
                <Col span={8} key={item.title}>
                  <Card size="small" bordered={false}>
                    <div style={{ fontSize: 24, marginBottom: 8 }}>{item.icon}</div>
                    <div style={{ fontWeight: 600, marginBottom: 4 }}>{item.title}</div>
                    <div style={{ color: '#666' }}>{item.value}</div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>

        <Col span={8}>
          <Card title="执行流程" style={{ marginBottom: 16 }}>
            <Timeline
              items={workflow.map((item) => ({ children: item }))}
            />
          </Card>
          <Card title="建议关注">
            <List
              dataSource={['均线金叉/死叉', '成交量放大', '回测参数优化', '最大回撤控制']}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default QuantDashboardPage
