import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Row, Col, Form, Input, Button,
  Spin,
  FormItemProps,
  Space,
  Select,
} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useUserDetail } from './useDetail'
import { userSexOpts, userTypeOpts } from '@/models/user'

const formLayout: FormItemProps = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 12
  }
}

const ArticleTypeDetailPage: React.FC = () => {

  const {
    form,
    isEdit,
    loading,
    onSave,
  } = useUserDetail()

  const navigate = useNavigate()

  return <Spin spinning={loading}>
    <h3>用户详情</h3>
    <Form
      form={form}
      {...formLayout}
      className="form"
      onFinish={onSave}
    >
      <Form.Item hidden name="id"/>
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item label="用户名" name="username" rules={[{required: true}]}>
              <Input placeholder="用户名" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="用户昵称" name="nickName" rules={[{required: true}]}>
              <Input placeholder="用户昵称" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="用户密码" name="password" rules={[{required: true}]}>
              <Input prefix={<LockOutlined />} type="password" placeholder="User Password" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name="confirm"
            label="确认密码"
            dependencies={['password']}
            rules={[
              {required: true},
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The new password that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input prefix={<LockOutlined />} type="password" placeholder="Confirm Password"/>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="用户类型" name="userType" rules={[{required: true,}]}>
            <Select placeholder="用户类型" options={userTypeOpts} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="性别" name="sex" rules={[{required: true,}]}>
            <Select placeholder="性别" options={userSexOpts} />
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

export default ArticleTypeDetailPage