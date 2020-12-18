import * as React from 'react'
import {inject, observer} from 'mobx-react'
import { Row, Col, Form, Icon, Input, Button, DatePicker, Select, Checkbox, Badge } from 'antd'

const FormItem = Form.Item

@inject('commentEditStore')
@observer
export default class CommentEdit extends React.Component<IProps> {

  back = () => {
    this.props.history.go(-1)
  }
  
  componentDidMount () {
    const {id}: any = this.props.match.params
    this.props.commentEditStore.getDetail(id)
  }

  render () {
    const { mainData } = this.props.commentEditStore
 
    return <React.Fragment>
      <Form className="search-form" layout="horizontal">
        <h3>评论详情</h3>
        <Row gutter={24}>
          <Col span={18}>
            <FormItem label="评论内容" labelCol={{sm: {span: 4}}} wrapperCol={{sm: { span: 20 }}}>
              <Input.TextArea rows={4} placeholder="评论内容" value={mainData.description} readOnly/>
            </FormItem>
          </Col>
          <Col span={18}>
            <FormItem label="文章ID" labelCol={{sm: {span: 4}}} wrapperCol={{sm: { span: 20 }}}>
              <Input placeholder="文章ID" value={mainData.articleId} readOnly/>
            </FormItem>
          </Col>
          <Col span={18}>
            <FormItem label="IP" labelCol={{sm: {span: 4}}} wrapperCol={{sm: { span: 20 }}}>
              <Input placeholder="IP" value={mainData.ip} readOnly/>
            </FormItem>
          </Col>
          <Col span={18}>
            <FormItem label="客户端" labelCol={{sm: {span: 4}}} wrapperCol={{sm: { span: 20 }}}>
              <Input.TextArea rows={4} placeholder="客户端" value={mainData.client} readOnly/>
            </FormItem>
          </Col>
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