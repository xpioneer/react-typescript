import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Form, Input, Button, Table, Select, Flex, Spin, Space } from 'antd'
import { dateFormat } from '@/utils/tools'
import { DatePicker } from 'components/datePicker'
import { User, UserSex, UserType, userTypeOpts } from '@models/user'
import { useList } from './useList'
import { ColumnsType, TablePaginationConfig, SorterResult, SortOrder } from 'antd/lib/table/interface'
import { DateFormat } from '@/types/base'


const UserPage: React.FC = () => {

  const navigate = useNavigate()

  const {
    form,
    loading,
    pageData,
    onQuery
  } = useList()

  const columns: ColumnsType<User> = [{
    title: 'ID',
    dataIndex: 'id',
    width: '15%',
  }, {
    title: '用户昵称',
    dataIndex: 'nickName',
    width: '100px',
  }, {
    title: '用户名',
    dataIndex: 'username',
    width: '100px',
  }, {
    title: '用户类型',
    dataIndex: 'userType',
    width: '80px',
    render: (value: number) => UserType[value],
  }, {
    title: '性别',
    dataIndex: 'sex',
    width: '40px',
    render: (value: number) => UserSex[value],
  }, {
    title: '备注',
    dataIndex: 'remark',
    width: '120px',
  }, {
    title: '创建时间',
    width: '120px',
    dataIndex: 'createdAt',
    key: 'createdAt',
    sorter: true
  }, {
    title: '更新时间',
    width: '120px',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    render: (value: string) => dateFormat(value, DateFormat.DateTime),
  }, {
    title: '操作',
    dataIndex: '',
    width: '80px',
    render: (text: string, record) => <Button size="small" type="primary" onClick={() => onView(record)}>详情</Button>
  }]

  const onView = (data: User) => {
    navigate(`${data.id}`)
  }

  const onChange = ({current, pageSize}: TablePaginationConfig, filters: any, sorter: any) => {
    const order = sorter.order, _order: AnyObject = {}
    if(order) {
      const field = sorter.columnKey!
      _order[field] = sorter.order === 'ascend' ? 'ASC' : 'DESC'
    }
    onQuery(current, pageSize, _order)
  }

  return <Spin spinning={loading}>
    <Form form={form} className="form">
      <h3>用户列表</h3>
      <Row gutter={24}>
        <Col span={6}>
          <Form.Item name="nickName">
            <Input placeholder="用户昵称"/>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="username">
            <Input placeholder="用户名"/>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="userType">
            <Select placeholder="用户类型" options={userTypeOpts} />
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

export default UserPage