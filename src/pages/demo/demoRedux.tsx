import * as React from 'react'
import { Row, Col, Button, Badge, Form, Input, Select } from 'antd'
import { ReduxProvider, connect } from '../../plugins/react-redux'
import { store, countActions } from './reducer'

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

class DemoRedux extends React.Component<any> {
  

  add = () => {
    store.dispatch({type: 'ADD'})
  }
  dec = () => {
    store.dispatch({type: 'DECREASE'})
  }

  shouldComponentUpdate (preState: any, nextProps: any) {
    console.log(preState, nextProps, 'shouldComponentUpdate')
    return true
  }

  componentDidMount () {
    console.log(this.props, 'demo --- componentDidMount store.getState().counter')
  }

  render () {
    // const count = 9
    const { counter: {count}, disabled } = this.props
    const { ADD, DECREASE } = this.props
    console.log( count, 'demo render =-===count', disabled, )
    
    return <div>
      <section style={styles.block}>
        <h3>redux测试</h3>
        <Row style={styles.padding}>
          <Col span={24}>
            <Button onClick={DECREASE}>
              <Icon type="minus" />
            </Button>
            <Badge count={count} showZero={true}/>
            <Button onClick={ADD}>
              <Icon type="plus" />
            </Button>
          </Col>
        </Row>
      </section>
    </div>
  }
}


const DemosComponentWithRedux = connect(
  (state: any) => ({
    counter: state.counter,
    disabled: state.counter.count > 10
  }),
  (dispatch: Function) => ({
    ADD: () => dispatch(countActions.ADD),
    DECREASE: () => dispatch(countActions.DECREASE)
  })
)(DemoRedux)


const ProviderComponent: React.FC = () => {
  return <ReduxProvider store={store}>
    <DemosComponentWithRedux/>
  </ReduxProvider>
}

export default ProviderComponent