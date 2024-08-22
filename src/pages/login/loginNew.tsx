import React, { useState } from 'react'
import { Form, Input, Button, Checkbox, Space, Flex } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { onLogin } from '../../services/account'
import { LoginForm } from '@/types/account'
import { storage } from "@utils/tools"
import { JWT_TOKEN, REDIRECT_URL } from "@constants/index"


const LoginPage: React.FC = () => {

  const [form] = Form.useForm<LoginForm>()

  const [loading, setLoading] = useState(false)

  const onFinish = (values: LoginForm) => {
    onLogin(values).then(res => {
      storage.set(JWT_TOKEN, res) // store jwt token
      window.location.replace(sessionStorage.getItem(REDIRECT_URL) || '/home')
    })
  }


  return <Form
    style={{
      'maxWidth': '300px',
      'margin': '0 auto',
      'paddingTop': '15%',
    }}
    form={form}
    onFinish={onFinish}
  >
    <h2>管理后台</h2>
    <Form.Item name="username" rules={[{required: true}]}>
      <Input prefix={<UserOutlined />} placeholder="Username"/>
    </Form.Item>
    <Form.Item name="password" rules={[{required: true}]}>
      <Input prefix={<LockOutlined />} type="password" placeholder="Password"/>
    </Form.Item>
    <Flex justify="space-between" align="baseline">
      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
      <a href="">Forgot password</a>
    </Flex>
    <Form.Item>
      <Button type="primary" htmlType='submit' loading={loading}>Log in</Button>
    </Form.Item>
    <a href="/register">Register now!</a>
  </Form>
}

export default LoginPage