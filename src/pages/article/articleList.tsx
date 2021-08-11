import * as React from 'react'
import {inject, observer} from 'mobx-react'
import { Row, Col, Form, Icon, Input, Button, DatePicker, Table, Modal, Badge, } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { IArticle } from '@models/article'

const FormItem = Form.Item


@inject('articleListStore')
@observer
export default class ArticleList extends React.Component<IProps> {

  state = {
    modalTitle: '参数详情',
    visible: false,
    modalTxt: '',
    visibleLog: false,
    detailInfo: {}
  }

  columns: ColumnProps<IArticle>[] = [{
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
    render: (text: string, record, index) => <Button size="small" type="primary" onClick={() => this.viewDetail(record)}>详情</Button>,
  }]

  viewDetail (data: IArticle) {
    this.props.history.push(`/home/blog-article/${data.id}`)
  }

  create = () => {
    this.props.history.push('/home/blog-articleCreate')
  }
  
  componentDidMount () {
    this.props.articleListStore.search()
  }

  render () {
    const { value, loading, list, meta, createdAt, inputChange, search, clear } = this.props.articleListStore
 
    return <React.Fragment>
      <Form className="search-form">
        <h3>文章列表</h3>
        <Row gutter={24}>
          <Col span={6}>
            <FormItem>
              <Input placeholder="标题" onChange={e => inputChange(e.target.value, 'title')} value={value.title}/>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem>
              <Input placeholder="摘要" onChange={e => inputChange(e.target.value, 'abstract')} value={value.abstract}/>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem>
              <Input placeholder="标签" onChange={e => inputChange(e.target.value, 'tag')} value={value.tag}/>
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
            <Button onClick={this.create} icon="edit">创建</Button>
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