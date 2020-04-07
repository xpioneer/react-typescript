import * as React from 'react'
import { Row, Col, Button, Badge, Icon, Form, Input, Select } from 'antd'
import { ReduxProvider, connect } from '@plugins/react-redux'
import { store } from './reducer'

console.log(store.getState(), '---store')

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


export default class DemoRedux extends React.Component<IProps> {
  

  add = () => {
    store.dispatch({type: 'ADD'})
  }
  dec = () => {
    store.dispatch({type: 'DECREASE'})
  }

  shouldComponentUpdate(preState: any, nextProps: any) {
    console.log(preState, nextProps)
    return false
  }

  componentDidMount() {
    console.log(this, 'store.getState().counter')
  }

  render(){
    // const count = 9
    const { count } = store.getState().counter
    console.log( count , ' =-===count ')
    
    return <ReduxProvider store={store}>
      <div>
        <section style={styles.block}>
          <h3>redux测试</h3>
          <Row style={styles.padding}>
            <Col span={24}>
              <Button onClick={this.dec}>
                <Icon type="minus" />
              </Button>
              <Badge count={count} showZero={true}/>
              <Button onClick={this.add}>
                <Icon type="plus" />
              </Button>
            </Col>
          </Row>
        </section>
      </div>
    </ReduxProvider>
  }
}