import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Row, Col, Form, Input, Button, DatePicker, Select, Checkbox, Badge } from 'antd'

const FormItem = Form.Item

const ArticleTypeDetail: React.FC = () => {

  const {id} = useParams<{id: string}>()
  const his = useHistory<{id: string}>()

  const back = () => {
    // this.props.history.go(-1)
  }

  console.log({id, his})
  

    return <React.Fragment>
      <Form className="search-form" layout="horizontal">
        <h3>文章类型详情</h3>
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
            <Button onClick={(e: any) => update()} type="primary">保存</Button>
            <Button onClick={this.back}>取消</Button>
          </Col>
        </Row>
      </Form>
    </React.Fragment>
}

export default ArticleTypeDetail