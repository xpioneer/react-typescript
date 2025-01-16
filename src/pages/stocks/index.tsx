import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Table, Input, Button, Spin, Select } from 'antd'
import { listColumns } from './util'
import { stockPageList, StockQuery } from '../../services/stock'
import { data2PageData, pageData2Params } from '../../utils/tools'
import { Stock, EMarket, EBlock } from '../../types/stock'
import { object2Options } from '@utils/tools'
import { StockChart } from './components/stockChart'
import { useNavigate } from 'react-router-dom'

const StockList: React.FC = () => {

  const navigate = useNavigate()

  const [form] = Form.useForm<StockQuery>()

  const [loading, setLoading] = useState(false)
  const [pageData, setPageData] = useState(data2PageData<Stock>())
  const [marketOpts] = useState(object2Options(EMarket))
  const [blockOpts] = useState(object2Options(EBlock))

  const onQuery = (params = pageData2Params(pageData.meta)) => {
    const vals = form.getFieldsValue()
    setLoading(true)
    stockPageList({...params, ...vals}).then(res => {
      setPageData(data2PageData(res))
    }).finally(() => setLoading(false))
  }

  const onOpts = (data: Stock) => {
    navigate(`${data.id}`)
  }

  useEffect(() => {
    onQuery()
  }, [])


  return <Spin spinning={loading}>
    <StockChart/>
    <Form className="pdtb16" form={form}>
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item name="code">
            <Input allowClear placeholder="Stock Code"/>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="name">
            <Input allowClear placeholder="Stock Name"/>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="market">
            <Select allowClear placeholder="Please Select Market" options={marketOpts}/>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="block">
            <Select allowClear placeholder="Please Select Block" options={blockOpts}/>
          </Form.Item>
        </Col>
      </Row>
      <Row justify="end">
        <Button type="primary" onClick={() => onQuery()}>Search</Button>
      </Row>
    </Form>
    <Table
      columns={listColumns(onOpts)}
      dataSource={pageData.data}
      rowKey="id"
      pagination={{
        ...pageData.meta,
        onChange: (page, pageSize) => onQuery({page, pageSize})
      }}
    />
  </Spin>
}


export default StockList