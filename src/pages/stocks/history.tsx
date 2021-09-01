import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Table, Input, Button, Spin, Select } from 'antd'
import { DatePicker } from 'components/datePicker'
import { historyColumns } from './util'
import { stockHistoryPageList, StockQuery } from '../../services/stockHistory'
import { data2PageData, pageData2Params } from '../../utils/tools'
import { StockHistory } from '../../types/stockHistory'

const StockHistoryList: React.FC = () => {

  const [form] = Form.useForm<StockQuery>()

  const [loading, setLoading] = useState(false)
  const [pageData, setPageData] = useState(data2PageData<StockHistory>({
    data: [],
    meta: {page: 1, pageSize: 20, total: 0}
  }))

  const onQuery = (params = pageData2Params(pageData.meta)) => {
    const vals = form.getFieldsValue()
    if(!vals.code) {
      return;
    }
    setLoading(true)
    stockHistoryPageList({...params, ...vals, }).then(res => {
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
            <Input allowClear placeholder="Stock Code"/>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="name">
            <Input allowClear placeholder="Stock Name"/>
          </Form.Item>
        </Col>
      </Row>
      <Row justify="end">
        <Button type="primary" onClick={() => onQuery()}>Search</Button>
      </Row>
    </Form>
    <Table
      columns={historyColumns()}
      dataSource={pageData.data}
      key="code"
      scroll={{x: 2400}}
      pagination={{
        ...pageData.meta,
        onChange: (page, pageSize) => onQuery({page, pageSize})
      }}
    />
  </Spin>
}


export default StockHistoryList