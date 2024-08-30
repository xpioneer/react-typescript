import { Spin, Form, Row, Col, Select } from 'antd'
import React from 'react'
import { useKLine } from './useKLine'

const DayKLineChart: React.FC<{id: string}> = ({id}) => {

  const {
    loading,
    chartRef,
    stockOpts,
    onQuery,
    onSelectSearch,
  } = useKLine()

  return <Spin spinning={loading}>
    <Row>
      <Col span={6}>
        <Form.Item name="id" rules={[{whitespace: true}]}>
          <Select
            allowClear
            showSearch
            filterOption={false}
            placeholder="Name/Code"
            options={stockOpts}
            onSearch={onSelectSearch}
            onSelect={onQuery}
          />
        </Form.Item>
      </Col>
    </Row>
    <div style={{height: 600}} ref={chartRef}></div>
  </Spin>
}

export default DayKLineChart
