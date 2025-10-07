import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Form, Input, Button, Table, Flex, Spin, Space } from 'antd'
import { DatePicker } from '@/components/datePicker'
import { LeaveMsg } from '@models/leaveMsg'
import { useList } from './useList'
import { ColumnsType, TablePaginationConfig, SorterResult, SortOrder } from 'antd/lib/table/interface'


const LeaveMsgPage: React.FC = () => {

  const navigate = useNavigate()

  const {
    form,
    loading,
    pageData,
    onQuery
  } = useList()

  const columns: ColumnsType<LeaveMsg> = [{
    title: 'ID',
    dataIndex: 'id',
    width: '15%',
  }, {
    title: '留言内容',
    dataIndex: 'description',
    width: '240px',
  }, {
    title: 'IP',
    dataIndex: 'ip',
    width: '120px',
  }, {
    title: '创建时间',
    width: '120px',
    dataIndex: 'createdAt',
    key: 'createdAt',
    sorter: true
  }, {
    title: '操作',
    dataIndex: '',
    width: '80px',
    render: (text: string, record) => <Button size="small" type="primary" onClick={() => onView(record)}>详情</Button>
  }]

  const onView = (data: LeaveMsg) => {
    navigate(`${data.id}`)
  }

  const onChange = ({current, pageSize}: TablePaginationConfig, filters: any, sorter: any) => {
    const order = sorter.order, _order: any = {}
    if(order) {
      const field = sorter.columnKey!
      _order[field] = sorter.order === 'ascend' ? 'ASC' : 'DESC'
    }
    onQuery(current, pageSize, _order)
  }

  return <Spin spinning={loading}>
    <Form
      form={form}
      className="form"
    >
      <h3>留言列表</h3>
      <Row gutter={24}>
        <Col span={6}>
          <Form.Item name="description">
            <Input placeholder="留言内容" />
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
          <Button type='primary' ghost onClick={() => navigate('leavemsg-edit')}>
            Create
          </Button>
          <Button onClick={() => form.resetFields()}>
            清空
          </Button>
          <Button type="primary" onClick={() => onQuery()}>
            搜索
          </Button>
        </Space>
      </Flex>
    </Form>
    <Table
      bordered
      // size='small'
      columns={columns}
      rowKey={(record: any) => record.id}
      dataSource={pageData.data}
      pagination={pageData.meta}
      onChange={onChange}
    />
  </Spin>
}

export default LeaveMsgPage