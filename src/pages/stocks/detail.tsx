import { dateFormat } from '@utils/tools'
import { Spin, Card, Col, Form, Row, Button, Space } from 'antd'
import React, { useState, useEffect } from 'react'
import { getStockDetail } from 'services/stock'
import { Stock, EBlock, EMarket } from 'types/stock'

const StockDetailPage: React.FC<ICommonProps<{id: number}>> = ({
  history,
  match: {params: {id}}
}) => {

  const [data, setData] = useState(new Stock)
  const [loading, setLoading] = useState(false)

  const onSync = () => {
    // 
  }
  const onSyncAll = () => {
    // 
  }

  useEffect(() => {
    setLoading(true)
    getStockDetail(id).then(setData).finally(() => setLoading(false))
  }, [id])

  console.log(data)

  return <Spin spinning={loading}>
    <Card title="Stock Detail" extra={<Button onClick={history.goBack}>Back</Button>}>
      <Row>
        <Col span="24">
          <Form.Item label="Stock Name">{data.name}</Form.Item>
        </Col>
        <Col span="24">
          <Form.Item label="Market">{EMarket[data.market]}</Form.Item>
        </Col>
        <Col span="24">
          <Form.Item label="Block">{EBlock[data.block]}</Form.Item>
        </Col>
        <Col span="24">
          <Form.Item label="Last Trade Date">{dateFormat(data.lastestTradeAt)}</Form.Item>
        </Col>
        <Col span="24">
          <Space>
            <Button type="primary" onClick={onSync}>Sync</Button>
            <Button type="ghost" onClick={onSyncAll}>Sync All</Button>
          </Space>
        </Col>
      </Row>
    </Card>
  </Spin>
}

export default StockDetailPage