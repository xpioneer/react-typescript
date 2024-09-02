import * as React from 'react'
import { useHistory } from 'react-router-dom'
import {
  Row, Col, Form, Input, Button, Table, Modal,
  Flex, Space, Spin,
} from 'antd'
import { DatePicker } from 'components/datePicker'
import { IArticle } from '@models/article'
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

  const columns: ColumnsType<IArticle> = [{
    title: 'ID',
    dataIndex: 'id',
    // sorter: true,
    // render: (name: any) => `${name.first} ${name.last}`,
    width: '15%',
  }, {
    title: '标题',
    dataIndex: 'title',
    // filters: [
    //   { text: 'Male', value: 'male' },
    //   { text: 'Female', value: 'female' },
    // ],
    width: '100px',
  }, {
    title: '摘要',
    dataIndex: 'abstract',
    width: '120px',
  }, {
    title: '创建时间',
    width: '70px',
    dataIndex: 'createdAt',
    key: 'createdAt',
    sorter: true
    // defaultSortOrder: 'descend',
    // sortOrder: true
  }, {
    title: '操作',
    dataIndex: '',
    width: '30px',
    render: (text: string, record, index) => <Button size="small" type="primary" onClick={() => onView(record)}>详情</Button>,
  }]

  const onView = (data: IArticle) => {
    history.push(`article/${data.id}`)
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
      <h3>文章列表</h3>
      <Row gutter={24}>
        <Col span={6}>
          <Form.Item name='title'>
            <Input placeholder="标题" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name='abstract'>
            <Input placeholder="摘要" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name='tag'>
            <Input placeholder="标签" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="createdAt">
            <DatePicker.RangePicker />
          </Form.Item>
        </Col>
      </Row>
      <Flex justify={'end'}>
        <Space>
          <Button type='primary' ghost onClick={() => history.push('article-new')}>
            Create
          </Button>
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
