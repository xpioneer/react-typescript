import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Table, Input, Button, Spin, Select } from 'antd'
import { listColumns } from './util'
import { stockPageList, StockQuery } from '../../services/stock'
import { data2PageData, pageData2Params } from '../../utils/tools'
import { Stock, marketOpts, blockOpts } from '../../types/stock'

const StockList: React.FC = () => {

  const [form] = Form.useForm<StockQuery>()

  const [loading, setLoading] = useState(false)
  const [pageData, setPageData] = useState(data2PageData<Stock>())

  const onQuery = (params = pageData2Params(pageData.meta)) => {
    const vals = form.getFieldsValue()
    setLoading(true)
    stockPageList({...params, ...vals}).then(res => {
      const data = data2PageData(res)
      setPageData(data)
    }).finally(() => setLoading(false))
  }

  useEffect(() => {
    onQuery()
  }, [])


  return <Spin spinning={loading}>
    <Form form={form}>
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item name="code">
            <Input allowClear placeholder="代码"/>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="name">
            <Input allowClear placeholder="名称"/>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="market">
            <Select allowClear placeholder="请选择市场" options={marketOpts()}/>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="block">
            <Select allowClear placeholder="请选择板块" options={blockOpts()}/>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={6} offset={18}>
          <Button onClick={() => onQuery()}>查询</Button>
        </Col>
      </Row>
    </Form>
    <Table
      columns={listColumns()}
      dataSource={pageData.data}
      key="code"
      pagination={{
        ...pageData.meta,
        onChange: (page, pageSize) => onQuery({page, pageSize})
      }}
    />
  </Spin>
}


export default StockList