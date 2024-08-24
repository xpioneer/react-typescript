import React from 'react'
import { useHistory } from 'react-router-dom'
import {
  Row, Col, Form, Input, Button,
  Spin,
  FormItemProps,
  Space
} from 'antd'
import { useArticleTypeDetail } from './useDetail'

const formLayout: FormItemProps = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16
  }
}

const ArticleTypeDetailPage: React.FC = () => {

  const {
    form,
    isEdit,
    loading,
    onSave,
  } = useArticleTypeDetail()

  const history = useHistory<{id: string}>()

  return <Spin spinning={loading}>
    <h3>文章类型详情</h3>
    <Form
      form={form}
      {...formLayout}
      className="search-form"
      onFinish={onSave}
    >
      <Form.Item hidden name="id"/>
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item name="name" label="类型名称" rules={[{required: true}]}>
            <Input placeholder="类型名称"/>
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
            <Button onClick={() => history.goBack()}>取消</Button>
          </Space>
        </Col>
      </Row>
    </Form>
  </Spin>
}

export default ArticleTypeDetailPage