import * as React from 'react'
import {inject, observer} from 'mobx-react'
import { Row, Col, Form, Input, Button, Table, Modal, Badge, } from 'antd'
import { DatePicker } from 'components/datePicker'
import { ColumnProps } from 'antd/lib/table'
import { ILeaveMsg } from '@models/leaveMsg'

const FormItem = Form.Item


@inject('leaveMsgListStore')
@observer
export default class LeaveMsgList extends React.Component<ICommonProps> {

  state = {
    modalTitle: '参数详情',
    visible: false,
    modalTxt: '',
    visibleLog: false,
    detailInfo: {}
  }

  columns: ColumnProps<ILeaveMsg>[] = [{
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
    render: (text: string, record: ILeaveMsg, index: number) => <Button size="small" type="primary" onClick={() => this.viewDetail(record)}>详情</Button>
  }]

  viewDetail (data: ILeaveMsg) {
    this.props.history.push(`/home/blog/message/detail/${data.id}`)
  }
  
  componentDidMount () {
    this.props.leaveMsgListStore.search()
  }

  render () {
    const { value, loading, list, meta, createdAt, inputChange, search, clear } = this.props.leaveMsgListStore
 
    return <React.Fragment>
      <Form className="search-form">
        <h3>留言列表</h3>
        <Row gutter={24}>
          <Col span={6}>
            <FormItem>
              <Input placeholder="留言内容" onChange={e => inputChange(e.target.value, 'description')} value={value.description}/>
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
            {/* <Button onClick={this.create} icon="edit">创建</Button> */}
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