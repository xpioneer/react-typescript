import * as React from 'react'
import {inject, observer} from 'mobx-react'
import { Row, Col, Form, Input, Button, DatePicker, Select, Checkbox, Badge } from 'antd'

const FormItem = Form.Item

@inject('userEditStore')
@observer
export default class UserEdit extends React.Component<ICommonProps> {

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
  
  componentDidMount () {
    const {id}: any = this.props.match.params
    this.props.userEditStore.getDetail(id)
  }

  render () {
    const { mainData, inputChange, update } = this.props.userEditStore
 
    return <React.Fragment>
      <Form className="search-form" layout="horizontal">
        <h3>用户详情</h3>
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
              <Input placeholder="不填写将不更新用户密码" type="password" value={mainData.password} onChange={e => inputChange(e.target.value, 'password')}/>
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
            <Button onClick={update} type="primary">保存</Button>
            <Button onClick={this.back}>取消</Button>
          </Col>
        </Row>
      </Form>
    </React.Fragment>
    
  }
}