import React, { useState } from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { onCreate } from '@/services/account'
import { LoginForm, RegisterForm } from '@/types/account'
import { storage } from "@utils/tools"
import { JWT_TOKEN, REDIRECT_URL } from "@constants/index"


const RegisterPage: React.FC = () => {

  const [form] = Form.useForm<RegisterForm>()

  const [loading, setLoading] = useState(false)

  const onFinish = (values: LoginForm) => {
    onCreate(values).then(res => {
      window.location.href = '/login'
    })
  }


  return <Form<RegisterForm>
    style={{
      'maxWidth': '300px',
      'margin': '0 auto',
      'paddingTop': '15%',
    }}
    form={form}
    onFinish={onFinish}
  >
    <h2>Create Your Account</h2>
    <Form.Item name="username" rules={[{required: true}]}>
      <Input prefix={<UserOutlined />} placeholder="Username"/>
    </Form.Item>
    <Form.Item name="password" rules={[{required: true}]}>
      <Input prefix={<LockOutlined />} type="password" placeholder="Password"/>
    </Form.Item>
    <Form.Item<RegisterForm>
      name="confirm"
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
    <Form.Item>
      <Button type="primary" htmlType='submit' loading={loading}>Create</Button>
    </Form.Item>
    <div>
      Already have an account? <a href='/login'>Login</a>
    </div>
  </Form>
}

export default RegisterPage