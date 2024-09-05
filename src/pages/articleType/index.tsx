import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Row, Col, Form, Input, Button, Table, Modal,
  TableColumnProps, Flex, Space, Spin,
} from 'antd'
import { DatePicker } from 'components/datePicker'
import { IArticleType } from '@models/articleType'
import { useArticleType } from './useArticleType'


const ArticleTypePage: React.FC = () => {

  const navigate = useNavigate()

  const {
    form,
    loading,
    pageData,
    onQuery
  } = useArticleType()

  const state = {
    modalTitle: '参数详情',
    visible: false,
    modalTxt: '',
    visibleLog: false,
    detailInfo: {}
  }

  const columns: TableColumnProps<IArticleType>[] = [{
    title: 'ID',
    dataIndex: 'id',
    // sorter: true,
    // render: (name: any) => `${name.first} ${name.last}`,
    width: '15%',
  }, {
    title: '类型名称',
    dataIndex: 'name',
    // filters: [
    //   { text: 'Male', value: 'male' },
    //   { text: 'Female', value: 'female' },
    // ],
    width: '100px',
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
    title: '操作',
    dataIndex: '',
    width: '80px',
    render: (text: string, record: IArticleType, index: number) => <Button size="small" type="primary" onClick={() => onView(record)}>详情</Button>
  }]

  const onView = (data: IArticleType) => {
    navigate(`type/${data.id}`)
  }

  return <Spin spinning={loading}>
    <Form
      form={form}
      className="form"
    >
      <h3>文章类型列表</h3>
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
          <Button type='primary' ghost onClick={() => navigate('type-new')}>
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

export default ArticleTypePage
