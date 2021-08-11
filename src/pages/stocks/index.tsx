import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Table, Input, Button, Spin, Select } from 'antd'
import { listColumns } from './util'
import { stockPageList, IStockQuery } from '../../services/stock'
import { data2PageData, pageData2Params } from '../../utils/tools'
import { marketOpts, blockOpts } from '../../types/stock'

const ShareList: React.FC = () => {

  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [pageData, setPageData] = useState(data2PageData())

  const onQuery = (params: Partial<IStockQuery> = pageData2Params(pageData.meta)) => {
    setLoading(true)
    stockPageList({...params, code, name}).then(res => {
      const data = data2PageData(res)
      setPageData(data)
    }).finally(() => setLoading(false))
  }

  useEffect(() => {
    onQuery()
  }, [])


  return <Spin spinning={loading}>
    <Form>
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item>
            <Input placeholder="代码" onChange={({target: {value}}) => setCode(value)}/>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item>
            <Input placeholder="名称" onChange={({target: {value}}) => setName(value)}/>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item>
            <Select placeholder="请选择市场"/>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item>
            <Select placeholder="请选择板块"/>
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
      pagination={{
        ...pageData.meta,
        onChange: (page, pageSize) => onQuery({page, pageSize})
      }}
    />
  </Spin>
}


export default ShareList