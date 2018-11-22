import * as React from 'react'
import {inject, observer} from 'mobx-react'
import { Row, Col, Form, Icon, Input, Button, Checkbox, Table } from 'antd';

const FormItem = Form.Item;

const columns = [{
  title: 'ID',
  dataIndex: 'id',
  sorter: true,
  // render: (name: any) => `${name.first} ${name.last}`,
  width: '20%',
}, {
  title: 'Path',
  dataIndex: 'path',
  // filters: [
  //   { text: 'Male', value: 'male' },
  //   { text: 'Female', value: 'female' },
  // ],
  width: '20%',
}, {
  title: '参数',
  dataIndex: 'params',
}, {
  title: '创建时间',
  dataIndex: 'createdAt',
}, {
  title: '耗时',
  dataIndex: 'time'
}];


@inject('apiLogStore')
@observer
export default class APILog extends React.Component<IProps> {

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  }

  render(){
    const { loading, list, meta, inputChange, search } = this.props.apiLogStore
    
    // return <div>
    //   <Row>
    //     <Col>

    //     </Col>
    //   </Row>
    // </div>
    return <React.Fragment>
      <Form className="search-form">
        <Row gutter={24}>
          <Col span={6}>
            <FormItem>
              <Input placeholder="id" onChange={e => inputChange(e.target.value, 'username')}/>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem>
              <Input placeholder="api" onChange={e => inputChange(e.target.value, 'pwd')}/>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem>
              <Input placeholder="id" onChange={e => inputChange(e.target.value, 'username')}/>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem>
              <Input placeholder="api" onChange={e => inputChange(e.target.value, 'pwd')}/>
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={6}>
            <FormItem>
              <Input placeholder="id" onChange={e => inputChange(e.target.value, 'username')}/>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem>
              <Input placeholder="api" onChange={e => inputChange(e.target.value, 'pwd')}/>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem>
              <Input placeholder="id" onChange={e => inputChange(e.target.value, 'username')}/>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem>
              <Input placeholder="api" onChange={e => inputChange(e.target.value, 'pwd')}/>
            </FormItem>
          </Col>
        </Row>
        <Row className="search-btn-w">
          <Col span={24}>
            <Button onClick={() => {}}>
              清空
            </Button>
            <Button type="primary" onClick={search}>
              搜索
            </Button>
          </Col>
        </Row>
      </Form>
      <Table
        columns={columns}
        rowKey={(record: any) => record.id}
        dataSource={list}
        pagination={meta}
        loading={loading}
        onChange={search}
      />
    </React.Fragment>
    
  }
}