import * as React from 'react'
import {inject, observer} from 'mobx-react'
import { Row, Col, Form, Icon, Input, Button, DatePicker, Select, Checkbox, Badge } from 'antd';

const FormItem = Form.Item;

@inject('userCreateStore')
@observer
export default class UserCreate extends React.Component<IProps> {

  userTypeList = [
    {name: '超级用户', value: 0},
    {name: '普通用户', value: 1},
    {name: '测试用户', value: 9},
  ]

  sexList = [
    {name: '女', value: 0},
    {name: '男', value: 1}
  ]

  back = () => {
    this.props.history.go(-1)
  }

  goDetail = (id: string) => {
    this.props.history.push(`/home/blog-user/${id}`)
  }
  
  componentDidMount() {
    // 
  }

  render(){
    const { mainData, inputChange, save, password, pwdChange } = this.props.userCreateStore
 
    return <React.Fragment>
      <Form className="search-form" layout="horizontal">
        <h3>新增用户</h3>
        <Row gutter={24}>
          <Col span={18}>
            <FormItem label="用户名" labelCol={{sm: {span: 4}}} wrapperCol={{sm: { span: 20 }}}>
              <Input placeholder="用户名" value={mainData.username} onChange={e => inputChange(e.target.value, 'username')}/>
            </FormItem>
          </Col>
          <Col span={18}>
            <FormItem label="用户昵称" labelCol={{sm: {span: 4}}} wrapperCol={{sm: { span: 20 }}}>
              <Input placeholder="用户昵称" value={mainData.nickName} onChange={e => inputChange(e.target.value, 'nickName')}/>
            </FormItem>
          </Col>
          <Col span={18}>
            <FormItem label="用户密码" labelCol={{sm: {span: 4}}} wrapperCol={{sm: { span: 20 }}}>
              <Input placeholder="用户密码" type="password" value={password.pwd} onChange={e => pwdChange(e.target.value, 'pwd')}/>
            </FormItem>
          </Col>
          <Col span={18}>
            <FormItem label="确认密码" labelCol={{sm: {span: 4}}} wrapperCol={{sm: { span: 20 }}}>
              <Input placeholder="确认密码" type="password" value={password.confirmPwd} onChange={e => pwdChange(e.target.value, 'confirmPwd')}/>
            </FormItem>
          </Col>
          <Col span={18}>
            <FormItem label="用户类型" labelCol={{sm: {span: 4}}} wrapperCol={{sm: { span: 20 }}}>
              <Select placeholder="用户类型" onChange={e => inputChange(e, 'userType')} value={mainData.userType}>
                {
                  this.userTypeList.map((u, i) => <Select.Option key={u.name} value={u.value}>{u.name}</Select.Option>)
                }
              </Select>
            </FormItem>
          </Col>
          <Col span={18}>
            <FormItem label="性别" labelCol={{sm: {span: 4}}} wrapperCol={{sm: { span: 20 }}}>
              <Select placeholder="性别" onChange={e => inputChange(e, 'sex')} value={mainData.sex}>
                {
                  this.sexList.map((s, i) => <Select.Option key={s.name} value={s.value}>{s.name}</Select.Option>)
                }
              </Select>
            </FormItem>
          </Col>
          <Col span={18}>
            <FormItem label="备注" labelCol={{sm: {span: 4}}} wrapperCol={{sm: { span: 20 }}}>
              <Input.TextArea rows={4} placeholder="备注" value={mainData.remark} onChange={e => inputChange(e.target.value, 'remark')}/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24} offset={3}>
            <Button onClick={(e: any) => save(this.goDetail)} type="primary">保存</Button>
            <Button onClick={this.back}>取消</Button>
          </Col>
        </Row>
      </Form>
    </React.Fragment>
    
  }
}