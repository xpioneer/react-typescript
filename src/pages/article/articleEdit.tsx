import * as React from 'react'
import {inject, observer} from 'mobx-react'
import { Row, Col, Form, Icon, Input, Button, DatePicker, Select, Checkbox, Badge } from 'antd';
import Editor from '@components/editor'

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group

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
export default class ArticleEdit extends React.Component<IProps> {

  back = () => {
    this.props.history.go(-1)
  }
  
  componentDidMount() {
    const {id}: any = this.props.match.params
    this.props.articleEditStore.getDetail(id)
  }

  render(){
    const { mainData, typeList, tagList, tagChange, inputChange, update } = this.props.articleEditStore
 
    return <React.Fragment>
      <Form className="search-form" layout="horizontal">
        <h3>文章详情</h3>
        <Row gutter={24}>
          <Col span={18}>
            <FormItem label="标题" labelCol={{sm: {span: 4}}} wrapperCol={{sm: { span: 20 }}}>
              <Input placeholder="标题" value={mainData.title} onChange={e => inputChange(e.target.value, 'title')}/>
            </FormItem>
          </Col>
          <Col span={18}>
            <FormItem label="摘要" labelCol={{sm: {span: 4}}} wrapperCol={{sm: { span: 20 }}}>
              <Input.TextArea rows={4} placeholder="摘要" value={mainData.abstract} onChange={e => inputChange(e.target.value, 'abstract')}/>
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={10}>
            <FormItem label="文章类型" labelCol={{sm: {span: 8}}} wrapperCol={{sm: { span: 16 }}}>
              <Select value={mainData.typeId} onChange={e => inputChange(e, 'typeId')}>
                {
                  typeList.map((t:any, i:number) => <Select.Option value={t.id} key={t.id}>{t.name}</Select.Option>)
                }
              </Select>
            </FormItem>
          </Col>
          <Col span={10}>
            <FormItem label="是否置顶" labelCol={{sm: {span: 8}}} wrapperCol={{sm: { span: 16 }}}>
              <Select value={mainData.isTop} onChange={e => inputChange(e, 'isTop')}>
                <Select.Option value={1}>是</Select.Option>
                <Select.Option value={0}>否</Select.Option>
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
        <Row gutter={24}>
          <Col span={24}>
            <FormItem label="内容" labelCol={{sm: {span: 3}}} wrapperCol={{sm: { span: 21 }}}>
              <Editor onChange={(text: string) => inputChange(text, 'description')} value={mainData.description}/>
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <FormItem label="标签" labelCol={{sm: {span: 3}}} wrapperCol={{sm: { span: 21 }}}>
              <CheckboxGroup options={tagList} value={mainData.tag ? mainData.tag.split(',') : []} onChange={tagChange} />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24} offset={3}>
            <Button onClick={update} type="primary">保存编辑</Button>
            <Button onClick={this.back}>取消</Button>
          </Col>
        </Row>
      </Form>
    </React.Fragment>
    
  }
}