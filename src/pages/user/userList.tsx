import * as React from 'react'
import {inject, observer} from 'mobx-react'
import { Row, Col, Form, Select, Input, Button, DatePicker, Table, Modal, Badge, } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { IUser } from '@models/user'

const FormItem = Form.Item


@inject('userListStore')
@observer
export default class UserList extends React.Component<ICommonProps> {

  state = {
    modalTitle: '参数详情',
    visible: false,
    modalTxt: '',
    visibleLog: false,
    detailInfo: {}
  }

  userTypeList = [
    {name: '请选择', value: ''},
    {name: '超级用户', value: 0},
    {name: '普通用户', value: 1},
    {name: '测试用户', value: 9},
  ]

  columns: ColumnProps<IUser>[] = [{
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
    render: (text: string, record: IUser, index: number) => <Button size="small" type="primary" onClick={() => this.viewDetail(record)}>详情</Button>
  }]

  viewDetail (data: IUser) {
    this.props.history.push(`/home/blog/user/detail/${data.id}`)
  }

  create = () => {
    this.props.history.push('/home/blog/user/create')
  }
  
  componentDidMount () {
    this.props.userListStore.search()
  }

  render () {
    const { value, loading, list, meta, createdAt, inputChange, search, clear } = this.props.userListStore
 
    return <React.Fragment>
      <Form className="search-form">
        <h3>用户列表</h3>
        <Row gutter={24}>
          <Col span={6}>
            <FormItem>
              <Input placeholder="用户昵称" onChange={e => inputChange(e.target.value, 'nickName')} value={value.nickName}/>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem>
              <Input placeholder="用户名" onChange={e => inputChange(e.target.value, 'username')} value={value.username}/>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem>
              <Select placeholder="用户类型" onChange={e => inputChange(e, 'userType')} value={value.userType}>
                {
                  this.userTypeList.map((u, i) => <Select.Option key={u.name} value={u.value}>{u.name}</Select.Option>)
                }
              </Select>
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