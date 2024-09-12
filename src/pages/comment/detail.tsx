import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Form, Input, Button, FormItemProps } from 'antd'
import { useDetail } from './useDetail'

const formLayout: FormItemProps = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16
  }
}

export default function CommentDetail() {

  const navigate = useNavigate()

  const {
    form,
    isEdit,
    loading,
    onSave,
  } = useDetail()
 
  return <React.Fragment>
    <Form
      form={form}
      {...formLayout}
      className="form"
      onFinish={onSave}
    >
      <h3>评论详情</h3>
      <Row gutter={24}>
        <Col span={20}>
          <Form.Item name="description" label="评论内容">
            <Input.TextArea rows={4} placeholder="评论内容" readOnly/>
          </Form.Item>
        </Col>
        <Col span={20}>
          <Form.Item name="articleId" label="文章ID">
            <Input placeholder="文章ID" readOnly/>
          </Form.Item>
        </Col>
        <Col span={20}>
          <Form.Item name="ip" label="IP">
            <Input placeholder="IP" readOnly/>
          </Form.Item>
        </Col>
        <Col span={20}>
          <Form.Item name="client" label="客户端">
            <Input.TextArea rows={4} placeholder="客户端" readOnly/>
          </Form.Item>
        </Col>
        <Col span={20}>
          <Form.Item name="createdAt" label="创建时间">
            <Input placeholder="创建时间" readOnly/>
          </Form.Item>
        </Col>
        <Col span={20}>
          <Form.Item name="updatedAt" label="UpdatedAt">
            <Input placeholder="UpdatedAt" readOnly/>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24} offset={3}>
          <Button onClick={() => navigate(-1)}>返回</Button>
        </Col>
      </Row>
    </Form>
  </React.Fragment>
}