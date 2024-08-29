import * as React from 'react'
import {inject, observer} from 'mobx-react'
import { Row, Col, Form, Input, Button, DatePicker, Select, Checkbox, Badge } from 'antd'

const FormItem = Form.Item

@inject('leaveMsgEditStore')
@observer
export default class LeaveMsgEdit extends React.Component<ICommonProps> {

  back = () => {
    this.props.history.go(-1)
  }
  
  componentDidMount () {
    const {id}: any = this.props.match.params
    this.props.leaveMsgEditStore.getDetail(id)
  }

  render () {
    const { mainData } = this.props.leaveMsgEditStore
 
    return <React.Fragment>
      <Form className="form" layout="horizontal">
        <h3>留言详情</h3>
        <Row gutter={24}>
          <Col span={18}>
            <FormItem label="留言内容" labelCol={{sm: {span: 4}}} wrapperCol={{sm: { span: 20 }}}>
              <Input.TextArea rows={4} placeholder="留言内容" value={mainData.description} readOnly/>
            </FormItem>
          </Col>
          <Col span={18}>
            <FormItem label="IP" labelCol={{sm: {span: 4}}} wrapperCol={{sm: { span: 20 }}}>
              <Input placeholder="IP" value={mainData.ip} readOnly/>
            </FormItem>
          </Col>
          {/* <Col span={18}>
            <FormItem label="客户端" labelCol={{sm: {span: 4}}} wrapperCol={{sm: { span: 20 }}}>
              <Input.TextArea rows={4} placeholder="客户端" value={mainData.client} readOnly/>
            </FormItem>
          </Col> */}
          <Col span={18}>
            <FormItem label="创建时间" labelCol={{sm: {span: 4}}} wrapperCol={{sm: { span: 20 }}}>
              <Input placeholder="创建时间" value={mainData.createdAt} readOnly/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24} offset={3}>
            <Button onClick={this.back}>返回</Button>
          </Col>
        </Row>
      </Form>
    </React.Fragment>
    
  }
}