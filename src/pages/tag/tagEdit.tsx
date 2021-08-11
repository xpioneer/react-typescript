import * as React from 'react'
import {inject, observer} from 'mobx-react'
import { Row, Col, Form, Icon, Input, Button, DatePicker, Select, Checkbox, Badge } from 'antd'

const FormItem = Form.Item

@inject('tagEditStore')
@observer
export default class TagEdit extends React.Component<IProps> {

  back = () => {
    this.props.history.go(-1)
  }
  
  componentDidMount () {
    const {id}: any = this.props.match.params
    this.props.tagEditStore.getDetail(id)
  }

  render () {
    const { mainData, inputChange, update } = this.props.tagEditStore
 
    return <React.Fragment>
      <Form className="search-form" layout="horizontal">
        <h3>标签详情</h3>
        <Row gutter={24}>
          <Col span={18}>
            <FormItem label="标签名称" labelCol={{sm: {span: 4}}} wrapperCol={{sm: { span: 20 }}}>
              <Input placeholder="标签名称" value={mainData.name} onChange={e => inputChange(e.target.value, 'name')}/>
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
            <Button onClick={(e: any) => update()} type="primary">保存</Button>
            <Button onClick={this.back}>取消</Button>
          </Col>
        </Row>
      </Form>
    </React.Fragment>
    
  }
}