import * as React from 'react'
import { observable, action, autorun, runInAction, computed } from 'mobx'
import {inject, observer} from 'mobx-react'
import { Row, Col, Button, Badge, Form, Input, Select, Space } from 'antd'
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'

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
export default class DemoMobx extends React.Component<ICommonProps> {

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
              <MinusCircleOutlined />
            </Button>
            <Badge count={count} showZero={true}/>
            <Button onClick={add}>
              <PlusCircleOutlined />
            </Button>
          </Col>
        </Row>
      </section>
      <section style={styles.block}>
        <h3>input test</h3>
        <Space>
          <Button onClick={dec}>
            <MinusCircleOutlined />
          </Button>
          <Input value={count} />
          <Button onClick={add}>
            <PlusCircleOutlined />
          </Button>
        </Space>
      </section>
    </div>
  }
}