import * as React from 'react'
import {inject, observer} from 'mobx-react'
import { Row, Col, Form, Icon, Input, Button, DatePicker, Select, Modal, Badge } from 'antd';
import Editor from '@components/editor'

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
}

@inject('articleEditStore')
@observer
export default class ArticleDetail extends React.Component<IProps> {

  edit() {
    const { match:{ params:{ id } }, history }: any = this.props
    history.push(`/blog-articleEdit/${id}`)
  }
  
  componentDidMount() {
    const {id}: any = this.props.match.params
    this.props.articleEditStore.getDetail(id)
  }

  render(){
    const { mainData, typeList, tagList, showTag, changeType, edit } = this.props.articleEditStore
 
    return <React.Fragment>
      <Form className="search-form" layout="horizontal">
        <h3>文章详情</h3>
        <Row gutter={24}>
          <Col span={20}>
            <FormItem label="标题" labelCol={{sm: {span: 4}}} wrapperCol={{sm: { span: 20 }}}>
              <Input placeholder="标题" defaultValue={mainData.title}/>
            </FormItem>
          </Col>
          <Col span={20}>
            <FormItem label="摘要" labelCol={{sm: {span: 4}}} wrapperCol={{sm: { span: 20 }}}>
              <Input.TextArea rows={4} readOnly placeholder="摘要" value={mainData.abstract}/>
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={10}>
            <FormItem label="文章类型" labelCol={{sm: {span: 8}}} wrapperCol={{sm: { span: 16 }}}>
              <Select disabled value={mainData.typeId} onChange={changeType}>
                {
                  typeList.map((t:any, i:number) => <Select.Option value={t.id} key={t.id}>{t.name}</Select.Option>)
                }
              </Select>
            </FormItem>
          </Col>
          <Col span={10}>
            <FormItem label="是否置顶" labelCol={{sm: {span: 8}}} wrapperCol={{sm: { span: 16 }}}>
              <Select disabled value={mainData.isTop}>
                <Select.Option value="1">是</Select.Option>
                <Select.Option value="0">否</Select.Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={10}>
            {/* <FormItem label="标题" {...formItemLayout}>
              <Input placeholder="标题" defaultValue={mainData.title}/>
            </FormItem> */}
          </Col>
          <Col span={10}>
            {/* <FormItem label="摘要" {...formItemLayout}>
              <Input placeholder="摘要" defaultValue={mainData.abstract}/>
            </FormItem> */}
          </Col>
        </Row>
        <Row className="search-btn-w">
          <Col span={24}>
            <Button onClick={() => this.edit()}>
              编辑
            </Button>
          </Col>
        </Row>
      </Form>
    </React.Fragment>
    
  }
}