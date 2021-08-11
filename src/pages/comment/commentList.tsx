import * as React from 'react'
import {inject, observer} from 'mobx-react'
import { Row, Col, Form, Icon, Input, Button, DatePicker, Table, Modal, Badge, } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { IComment } from '@models/comment'

const FormItem = Form.Item


@inject('commentListStore')
@observer
export default class CommentList extends React.Component<IProps> {

  state = {
    modalTitle: '参数详情',
    visible: false,
    modalTxt: '',
    visibleLog: false,
    detailInfo: {}
  }

  columns: ColumnProps<IComment>[] = [{
    title: 'ID',
    dataIndex: 'id',
    width: '15%',
  }, {
    title: '评论内容',
    dataIndex: 'description',
    width: '240px',
  }, {
    title: '文章ID',
    dataIndex: 'articleId',
    width: '120px',
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
    title: '操作',
    dataIndex: '',
    width: '80px',
    render: (text: string, record: IComment, index: number) => <Button size="small" type="primary" onClick={() => this.viewDetail(record)}>详情</Button>
  }]

  viewDetail (data: IComment) {
    this.props.history.push(`/home/blog-comment/${data.id}`)
  }
  
  componentDidMount () {
    this.props.commentListStore.search()
  }

  render () {
    const { value, loading, list, meta, createdAt, inputChange, search, clear } = this.props.commentListStore
 
    return <React.Fragment>
      <Form className="search-form">
        <h3>评论列表</h3>
        <Row gutter={24}>
          <Col span={6}>
            <FormItem>
              <Input placeholder="评论内容" onChange={e => inputChange(e.target.value, 'description')} value={value.description}/>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem>
              <DatePicker.RangePicker onChange={(e) => inputChange(e, 'createdAt')} value={createdAt}/>
            </FormItem>
          </Col>
        </Row>
        <Row className="search-btn-w">
          <Col span={24}>
            <Button onClick={clear}>清空</Button>
            <Button type="primary" onClick={search}>搜索</Button>
          </Col>
        </Row>
      </Form>
      <Table
        bordered
        className="table-list"
        columns={this.columns}
        rowKey={(record: any) => record.id}
        dataSource={list}
        pagination={meta}
        loading={loading}
        onChange={search}
      />
    </React.Fragment>
    
  }
}