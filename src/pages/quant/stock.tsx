import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Button, Card, Col, Drawer, Flex, Row, Select, Spin, Table, Tag } from 'antd'
import styles from './style.module.scss'
import {  stockOpts, strategyOpts } from '@/types/quant'
import { DatePicker } from '@/components/datePicker'
import { useStock } from './useStock'


const StockQuantPage: React.FC = () => {
  const {
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
    summary,
    columns,
    equityCurveColumns,
    equityCurveData,
  } = useStock()
  
  return (
    <div className={styles.quantContainer}>
      <Card
        title="单只股票量化分析"
        style={{ marginBottom: 16 }}
        extra={
          <Button type="primary" onClick={() => setOpen1(true)}>
            资金明细
          </Button>
        }
      >
        <Row gutter={[16, 16]} align="middle">
          <Col span={4}>
            <Select
              value={symbol}
              onChange={setSymbol}
              style={{ width: '100%' }}
              options={stockOpts}
            />
          </Col>
          <Col span={4}>
            <div style={{ color: '#666' }}>
              最新收盘：{summary.latest ? Number(summary.latest.close).toFixed(2) : '—'}
            </div>
          </Col>
          <Col span={4}>
            <div style={{ color: summary.change && summary.change >= 0 ? '#52c41a' : '#cf1322' }}>
              日变动：{summary.change !== null ? `${summary.change.toFixed(2)}%` : '—'}
            </div>
          </Col>
          <Col span={4}>
            <Tag color="blue">成交量：{summary.volume ? summary.volume.toLocaleString() : '—'}</Tag>
          </Col>
        </Row>
        <Row gutter={[16, 16]} align="middle" style={{ marginTop: 16 }}>
          <Col span={4}>
            <Select
              value={strategy}
              onChange={setStrategy}
              style={{ width: '100%' }}
              options={strategyOpts}
            />
          </Col>
          <Col span={4}>
            <div
              style={{
                color:
                  strategyData?.totalReturn && strategyData?.totalReturn >= 0
                    ? '#cf1322'
                    : '#52c41a',
              }}
            >
              总收益率：{strategyData?.totalReturn ?? '0'}%
            </div>
          </Col>
          <Col span={4}>
            <div style={{ color: 'red' }}>最大回撤：{strategyData?.maxDrawdown ?? '0'}%</div>
          </Col>
          <Col span={4}>
            <Tag color="blue">夏普比率：{strategyData?.sharpeRatio ?? '0'}%</Tag>
          </Col>
          <Col span={4}>
            <Tag color="blue">总交易次数：{strategyData?.totalTrades ?? '0'}</Tag>
          </Col>
          <Col span={4}>
            <Tag color="blue">初始金额：{strategyData?.initialCapital ?? '0'}</Tag>
          </Col>
          <Col span={4}>
            <Tag color="blue">最终金额：{strategyData?.finalValue ?? '0'}</Tag>
          </Col>
        </Row>
      </Card>
      <Card
        title={`${symbol} K线策略图`}
        extra={
          <Flex gap={8} align="center">
            <DatePicker.RangePicker
              value={dateRange}
              onChange={(dates) => setDateRange(dates as [Date | null, Date | null])}
            />
            <Button onClick={() => setOpen(true)}>查看表格</Button>
          </Flex>
        }
      >
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
