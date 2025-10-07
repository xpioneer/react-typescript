import React from 'react'
import {
  Row, Col, Form, Input, Button, Flex, Space,
  Table, Badge, TableColumnProps,
  Spin,
} from 'antd'
import { DatePicker } from '@/components/datePicker'
import { dateFormat, object2Str } from '@utils/tools'
import { ErrorLog } from 'types/apiError'
import { RequestStatus } from 'types/api'
import { useErrors } from './useErrors'
import { JSONView } from '@/components/jsonView'
import { modal } from '@/components/message'
import { LogDetailDrawer } from './drawer'
import { DateFormat } from '@/types/base'

const ErrorsLogPage: React.FC = () => {

  const {
    form,
    loading,
    pageData,
    onQuery,
    data,
    setData,
  } = useErrors()

  const columns: TableColumnProps<ErrorLog>[] = [{
    title: 'ID',
    dataIndex: 'id',
    sorter: true,
    // render: (name: any) => `${name.first} ${name.last}`,
    width: '120px',
  }, {
    title: 'Path',
    dataIndex: 'path',
    // filters: [
    //   { text: 'Male', value: 'male' },
    //   { text: 'Female', value: 'female' },
    // ],
    width: '100px',
  }, {
    title: 'Url',
    dataIndex: 'url',
    width: '120px',
    render: (value: string, record) => <div className="textflow-4"> {value} </div>,
  }, {
    title: '请求方式',
    dataIndex: 'method',
    width: '60px',
  }, {
    title: '参数',
    dataIndex: 'params',
    render: (value: string, record) => <div className="textflow-4"> {object2Str(value)} </div>,
  }, {
    title: '错误信息',
    dataIndex: 'msg',
    render: (value: string, record) => <div className="textflow-4"> {value} </div>,
  }, {
    title: '状态',
    dataIndex: 'status',
    width: '60px',
    render: (value: string, record) => <Badge status={getStatus(value)} text={value}/>,
  }, {
    title: '创建时间',
    width: '120px',
    dataIndex: 'createdAt',
    render: (value: string) => dateFormat(value, DateFormat.DateTimeMS),
  }, {
    title: '耗时(ms)',
    dataIndex: 'time',
    width: '60px',
  }, {
    title: '操作',
    dataIndex: '',
    width: '60px',
    fixed: 'right',
    render: (text: string, record) => <Button size="small" type="primary" onClick={() => setData(record)}>详情</Button>,
  }]

  // 获取状态badge
  const getStatus = (status: any): RequestStatus => {
    let info: RequestStatus = 'default'
    if(/^2\d{2}/.test(status)) {
      info = 'success'
    } else if(/^4\d{2}/.test(status)) {
      info = 'warning'
    } else if(/^5\d{2}/.test(status)) {
      info = 'error'
    }
    return info
  }
 
  return <Spin spinning={loading}>
    <Form className="form" form={form}>
      <h3>错误日志</h3>
      <Row gutter={24}>
        <Col span={6}>
          <Form.Item name="path">
            <Input placeholder="path" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="url">
            <Input placeholder="url" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="msg">
            <Input placeholder="错误信息" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="createdAt">
            <DatePicker.RangePicker />
          </Form.Item>
        </Col>
      </Row>
      <Flex className='mgb16' justify={'end'}>
        <Space>
          <Button htmlType='reset'>
            清空
          </Button>
          <Button type="primary" onClick={() => onQuery()}>
            搜索
          </Button>
        </Space>
      </Flex>
    </Form>
    <Table
      size='small'
      scroll={{x: 1600}}
      columns={columns}
      rowKey={record => record.id}
      onRow={(r) => ({onClick: () => setData(r)})}
      dataSource={pageData.data}
      pagination={pageData.meta}
      onChange={({current, pageSize}) => onQuery(current, pageSize)}
    />
    <LogDetailDrawer data={data!} onClose={() => setData(undefined)} />
  </Spin>
}

export default ErrorsLogPage
