import * as React from 'react'
import { observable, action, autorun, runInAction, computed } from 'mobx'
import {inject, observer} from 'mobx-react'
import { Row, Col, Button, Badge, Icon, Form, Input, Select } from 'antd'

const FormItem = Form.Item
const TextArea = Input.TextArea
const Option = Select.Option

const styles = {
  block: {
    marginBottom: '20px',
    boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
    padding: '10px'
  },
  flex: {
    display: 'flex',
    alignItems: 'center'
  },
  padding: {
    padding: '10px 0'
  }
}

@observer
export default class DemoMobx extends React.Component<IProps> {

  // state = {
  //   count: 0,
  // }
  // add = () => {
  //   this.setState({
  //     count: ++this.state.count
  //   })
  // }
  // dec = () => {
  //   this.setState({
  //     count: --this.state.count
  //   })
  // }

  @observable count = 66

  @action add = () => { this.count++ }
  @action dec = () => { this.count-- }

  componentDidMount () {
    // console.log($http)
    // console.log(this.props)
    console.log(this)
  }

  render () {
    // const {count} = this.state
    const {count, add, dec} = this
    
    return <div>
      <section style={styles.block}>
        <h3>mini测试</h3>
        <Row style={styles.padding}>
          <Col span={24}>
            <Button onClick={dec}>
              <Icon type="minus" />
            </Button>
            <Badge count={count} showZero={true}/>
            <Button onClick={add}>
              <Icon type="plus" />
            </Button>
          </Col>
        </Row>
      </section>
      
      {/* <section style={styles.block}>
        <h3>接口测试</h3>
        <Row style={styles.padding}>
          <Col span={24}>
            <Form>
              <FormItem label="api" labelCol={{span: 4}} wrapperCol={{span: 20}}>
                <Row gutter={8}>
                  <Col span={12}>
                    <Input placeholder="请输入url" onChange={e => inputApi(e.target.value)} value={apiUrl}/>
                  </Col>
                  {
                    apiType === '/api' ?
                    <Col span={3}>
                      <Select value={apiMethod}
                        onChange={methodChange}>
                        <Option value="GET">GET</Option>
                        <Option value="POST">POST</Option>
                        <Option value="PUT">PUT</Option>
                        <Option value="DELETE">DELETE</Option>
                      </Select>
                    </Col> : ''
                  }
                  <Col span={3}>
                    <Select value={apiType}
                      onChange={typeChange}>
                      <Option value="/api">RESTful</Option>
                      <Option value="/graphql">GraphQL</Option>
                    </Select>
                  </Col>
                  <Col span={6}>
                    <Button type="primary" onClick={testApi}>发送</Button>
                  </Col>
                </Row>
              </FormItem>
              <FormItem label="参数(json格式)" labelCol={{span: 4}} wrapperCol={{span: 12}}>
                <TextArea rows={6} onChange={e => inputParams(e.target.value)} value={apiParams}/>
              </FormItem>
              <FormItem label="结果" labelCol={{span: 4}} wrapperCol={{span: 18}}>
                <TextArea rows={24} value={apiResult}/>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </section>

      <section style={styles.block}>
        <h3>文件上传</h3>
        <Row style={styles.padding}>
          <Col span={24}>
            <Form>
              <FormItem label="选择文件" labelCol={{span: 4}} wrapperCol={{span: 20}}>
                <Row gutter={8}>
                  <Col span={12}>
                    <input type="file" placeholder="请选择文件" onChange={e => fileChange(e)}/>
                  </Col>
                  <Col span={6}>
                    <Button type="primary" onClick={upload}>上传</Button>
                    <Button onClick={fileChange}>清空</Button>
                  </Col>
                </Row>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </section>
       */}
    </div>
  }
}