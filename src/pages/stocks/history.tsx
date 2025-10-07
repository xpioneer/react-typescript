import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Table, Input, Button, Spin, Select } from 'antd'
import { DatePicker } from '@components/datePicker'
import { historyColumns } from './util'
import { stockHistoryPageList, stockHistoryTotal } from '../../services/stockHistory'
import { data2PageData, pageData2Params } from '../../utils/tools'
import { StockHistory } from '../../types/stockHistory'
import { debounce } from 'lodash'
import { stockPageList } from '@/services/stock'
import { StockQuery } from '@/types/stock'

const StockHistoryList: React.FC = () => {

  const [form] = Form.useForm<StockQuery>()

  const [loading, setLoading] = useState(false)
  const [pageData, setPageData] = useState(data2PageData<StockHistory>({
    data: [],
    meta: {page: 1, pageSize: 10, total: 0}
  }))
  const [stockOpts, setStockOpts] = useState<IOption<number>[]>([])
  const [total, setTotal] = useState(0)

  const onQuery = (params = pageData2Params(pageData.meta)) => {
    const vals = form.getFieldsValue()
    if(!vals.id) {
      return
    }
    setLoading(true)
    stockHistoryPageList({...params, ...vals, }).then(res => {
      const data = data2PageData(res)
      setPageData(data)
    }).finally(() => setLoading(false))
  }

  const onSelectSearch = debounce((v: string) => {
    if(!v.trim()) {
      return
    }
    stockPageList({
      code: v,
      name: v,
      page: 1,
      pageSize: 100,
      noPage: true
    }).then(res => {
      const list = res.data.map<IOption<number>>(item => ({value: item.id, label: item.name}))
      setStockOpts(list)
    })
  }, 500)

  useEffect(() => {
    onQuery()
    stockHistoryTotal().then(setTotal)
  }, [])

  const onSelect = (id: number) => {
    onQuery({id, page: 1, pageSize: 10} as any)
  }


  return <Spin spinning={loading}>
    <Form className="mgb16" form={form}>
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item name="id">
            <Select
              allowClear
              showSearch
              filterOption={false}
              placeholder="Name/Code"
              options={stockOpts}
              onSearch={onSelectSearch}
              onSelect={onSelect}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="space-between">
        <div>All History：{total}</div>
        <Button type="primary" onClick={() => onQuery()}>Search</Button>
      </Row>
    </Form>
    <Table
      size="small"
      columns={historyColumns()}
      dataSource={pageData.data}
      rowKey="id"
      scroll={{x: 2400}}
      pagination={{
        ...pageData.meta,
        onChange: (page, pageSize) => onQuery({page, pageSize})
      }}
    />
  </Spin>
}


export default StockHistoryList