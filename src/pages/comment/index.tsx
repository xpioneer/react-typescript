import * as React from 'react'
import { useHistory } from 'react-router-dom'
import {
  Row, Col, Form, Input, Button, Table, Modal,
  Flex, Space, Spin,
} from 'antd'
import { DatePicker } from 'components/datePicker'
import { IComment } from '@models/comment'
import { useList } from './useList'
import { ColumnsType, TablePaginationConfig, SorterResult, SortOrder } from 'antd/lib/table/interface'

const CommentPage: React.FC = () => {

  const history = useHistory()

  const {
    form,
    loading,
    pageData,
    onQuery
  } = useList()

  const columns: ColumnsType<IComment> = [{
    title: 'ID',
    dataIndex: 'id',
    width: '10%',
  }, {
    title: '评论内容',
    dataIndex: 'description',
    width: '240px',
  }, {
    title: '文章ID',
    dataIndex: 'articleId',
    width: '100px',
  }, {
    title: 'IP',
    dataIndex: 'ip',
    width: '100px',
  }, {
    title: '创建时间',
    width: '120px',
    dataIndex: 'createdAt',
    key: 'createdAt',
    sorter: true
  }, {
    title: '编辑时间',
    width: '120px',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  }, {
    title: '操作',
    dataIndex: '',
    width: '80px',
    render: (text: string, record: IComment, index: number) => <Button size="small" type="primary" onClick={() => onView(record)}>详情</Button>
  }]

  const onView = (data: IComment) => {
    history.push(`comment/${data.id}`)
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
      <h3>评论列表</h3>
      <Row gutter={24}>
        <Col span={6}>
          <Form.Item name="description">
            <Input placeholder="评论内容" />
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
          <Button type='primary' ghost onClick={() => history.push('comment-edit')}>
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
      size='small'
      columns={columns}
      rowKey={(record: any) => record.id}
      dataSource={pageData.data}
      pagination={pageData.meta}
      onChange={onChange}
    />
  </Spin>
}

export default CommentPage