import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Row, Col, Form, Input, Button,
  Spin,
  FormItemProps,
  Space
} from 'antd'
import { useDetail } from './useDetail'

const formLayout: FormItemProps = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16
  }
}

const TagDetailPage: React.FC = () => {

  const {
    form,
    isEdit,
    loading,
    onSave,
  } = useDetail()

  const navigate = useNavigate()

  return <Spin spinning={loading}>
    <h3>文章标签详情</h3>
    <Form
      form={form}
      {...formLayout}
      className="form"
      onFinish={onSave}
    >
      <Form.Item hidden name="id"/>
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item name="name" label="标签名称">
            <Input placeholder="标签名称"/>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="remark" label="备注">
            <Input.TextArea rows={4} placeholder="备注"/>
          </Form.Item>
        </Col>
        {
          isEdit && <>
            <Col span={24}>
              <Form.Item name="createdAt" label="创建时间">
                <Input placeholder="创建时间" disabled/>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="updatedAt" label="更新时间">
                <Input placeholder="更新时间" disabled/>
              </Form.Item>
            </Col>
          </>
        }
        <Col span={24} offset={4}>
          <Space>
            <Button htmlType='submit' type="primary">保存</Button>
            <Button onClick={() => navigate(-1)}>取消</Button>
          </Space>
        </Col>
      </Row>
    </Form>
  </Spin>
}

export default TagDetailPage