import * as React from 'react'
import {inject, observer} from 'mobx-react'
import { Row, Col, Form, Icon, Input, Button, DatePicker, Select, Checkbox, Badge } from 'antd'

const FormItem = Form.Item

@inject('articleTypeCreateStore')
@observer
export default class ArticleTypeCreate extends React.Component<IProps> {

  back = () => {
    this.props.history.go(-1)
  }

  goDetail = (id: string) => {
    this.props.history.push(`/home/blog-type/${id}`)
  }
  
  componentDidMount () {
    // 
  }

  render () {
    const { mainData, inputChange, save } = this.props.articleTypeCreateStore
 
    return <React.Fragment>
      <Form className="search-form" layout="horizontal">
        <h3>新增文章类型</h3>
        <Row gutter={24}>
          <Col span={18}>
            <FormItem label="类型名称" labelCol={{sm: {span: 4}}} wrapperCol={{sm: { span: 20 }}}>
              <Input placeholder="类型名称" value={mainData.name} onChange={e => inputChange(e.target.value, 'name')}/>
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