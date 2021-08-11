import * as React from 'react'
import {inject, observer} from 'mobx-react'
import { Row, Col, Form, Icon, Input, Button, DatePicker, Table, Modal, Badge, } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { IArticleType } from '@models/articleType'

const FormItem = Form.Item


@inject('articleTypeListStore')
@observer
export default class ArticleTypeList extends React.Component<IProps> {

  state = {
    modalTitle: '参数详情',
    visible: false,
    modalTxt: '',
    visibleLog: false,
    detailInfo: {}
  }

  columns: ColumnProps<IArticleType>[] = [{
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
    render: (text: string, record: IArticleType, index: number) => <Button size="small" type="primary" onClick={() => this.viewDetail(record)}>详情</Button>
  }]

  viewDetail (data: IArticleType) {
    this.props.history.push(`/home/blog-type/${data.id}`)
  }

  create = () => {
    this.props.history.push('/home/blog-typeCreate')
  }
  
  componentDidMount () {
    this.props.articleTypeListStore.search()
  }

  render () {
    const { value, loading, list, meta, createdAt, inputChange, search, clear } = this.props.articleTypeListStore
 
    return <React.Fragment>
      <Form className="search-form">
        <h3>文章类型列表</h3>
        <Row gutter={24}>
          <Col span={6}>
            <FormItem>
              <Input placeholder="名称" onChange={e => inputChange(e.target.value, 'name')} value={value.name}/>
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