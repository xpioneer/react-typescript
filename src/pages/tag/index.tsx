import * as React from 'react'
import { useHistory } from 'react-router-dom'
import {
  Row, Col, Form, Input, Button, Table, DatePicker,
  TableColumnsType, Spin,
  Flex, Space,
} from 'antd'
// import { DatePicker } from 'components/datePicker'
import { ITag } from '@models/tag'
import { useTag } from './useTag'

const TagPage: React.FC<ICommonProps<AnyObject>> = () => {

  const history = useHistory()

  const {
    form,
    loading,
    pageData,
    onQuery
  } = useTag()

  const columns: TableColumnsType<ITag> = [{
    title: 'ID',
    dataIndex: 'id',
    width: '15%',
  }, {
    title: '标签名称',
    dataIndex: 'name',
    width: '100px',
  }, {
    title: '备注',
    dataIndex: 'remark',
    width: '120px',
  }, {
    title: '创建时间',
    width: '100px',
    dataIndex: 'createdAt',
    key: 'createdAt',
    sorter: true
  }, {
    title: '更新时间',
    width: '100px',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    sorter: true
  }, {
    title: '操作',
    dataIndex: '',
    width: '80px',
    render: (text: string, record: ITag, index: number) => <Button size="small" type="primary" onClick={() => onView(record)}>详情</Button>
  }]

  const onView = (data: ITag) => {
    history.push(`tag/${data.id}`)
  }

  // const create = () => {
  //   this.props.history.push('/blog/tag/create')
  // }
  
  return <Spin spinning={loading}>
    <Form form={form}>
      <h3>标签列表</h3>
      <Row gutter={24}>
        <Col span={6}>
          <Form.Item name="name">
            <Input placeholder="名称" />
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
          <Button type='primary' ghost onClick={() => history.push('tag-new')}>
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
      columns={columns}
      rowKey={(record: any) => record.id}
      dataSource={pageData.data}
      pagination={pageData.meta}
      onChange={({current, pageSize}) => onQuery(current, pageSize)}
    />
  </Spin>
}

export default TagPage