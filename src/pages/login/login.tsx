import * as React from 'react'
import {inject, observer} from 'mobx-react'
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

const FormItem = Form.Item

@inject('loginStore')
@observer
export default class Login extends React.Component<ICommonProps> {

  // componentWillMount(){
  //   console.log('componentWillMount')
  // }

  // componentWillReceiveProps(){
  //   console.log('componentWillReceiveProps')
  // }

  // shouldComponentUpdate(){
  //   console.log('shouldComponentUpdate')
  //   return true
  // }

  // componentWillUpdate(){
  //   console.log('componentWillUpdate')
  // }
  
  // componentDidUpdate(){
  //   console.log('componentDidUpdate')
  // }

  componentDidMount () {
    console.log('componentDidMount')
    window.addEventListener('keydown', this.listenEnter)
  }

  // componentWillUnmount() {
  //   console.log('componentWillUnmount')
  // }

  listenEnter = (e: KeyboardEvent) => {
    if (e.keyCode === 13) {
      this.props.loginStore.login()
    }
  }

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  render () {
    const { inputChange, login, loading, canLogin } = this.props.loginStore
    
    return <Form style={{
      'maxWidth': '300px',
      'margin': '0 auto',
      'paddingTop': '15%'}}>
      <h2>管理后台</h2>
      <FormItem>
        <Input prefix={<UserOutlined />} placeholder="Username"
          onChange={e => inputChange(e.target.value, 'username')}/>
      </FormItem>
      <FormItem>
        <Input prefix={<LockOutlined />} type="password" placeholder="Password"
          onChange={e => inputChange(e.target.value, 'pwd')}/>
      </FormItem>
      <FormItem>
        {/* <Checkbox>Remember me</Checkbox>
      <a href="">Forgot password</a> */}
        <Button type="primary" onClick={login} disabled={!canLogin} loading={loading}>Log in</Button>
        {/* Or <a href="">register now!</a> */}
      </FormItem>
    </Form>
  }
}