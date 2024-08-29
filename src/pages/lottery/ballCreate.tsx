import * as React from 'react'
import {inject, observer} from 'mobx-react'
import { Row, Col, Form, Input, Button, DatePicker, Select, Checkbox, Badge } from 'antd'

const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group

@inject('ballCreateStore')
@observer
export default class BallCreate extends React.Component<ICommonProps> {

  style = {
    wrap: {
      display: 'flex',
      paddingTop: '10px',
      flexWrap: 'wrap'
    },
    red: {
      width: '30px',
      height: '30px',
      borderRadius: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: '0 0 auto',
      margin: '0 4px 4px 0',
      cursor: 'pointer',
      border: '1px solid #f54646',
      color: '#f54646'
    },
    blue: {
      width: '30px',
      height: '30px',
      borderRadius: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: '0 0 auto',
      margin: '0 4px 4px 0',
      cursor: 'pointer',
      border: '1px solid #39f',
      color: '#39f'
    }
  }

  back = () => {
    this.props.history.go(-1)
  }

  setActive = (type: 'red'|'blue', selected: [number], num: number) => {
    const color =  type === 'red' ? '#f54646' : '#39f'
    if (selected.some((v, i) => num === v)) {
      let _style = JSON.parse(JSON.stringify(this.style[type]))
      _style['backgroundColor'] = color
      _style['color'] = '#fff'
      return _style
    } else {
      return this.style[type]
    }
  }

  // goDetail = (id: string) => {
  //   this.props.history.push(`/home/blog-tag/${id}`)
  // }
  
  componentDidMount () {
    // 
  }

  render () {
    const { redBalls, blueBalls, reds, blues, selectBall, mainData, inputChange, save } = this.props.ballCreateStore
 
    return <React.Fragment>
      <Form className="form" layout="horizontal">
        <h3>新增一期双色球</h3>
        <Row gutter={24}>
          <Col span={18}>
            <FormItem label="期号" labelCol={{sm: {span: 4}}} wrapperCol={{sm: { span: 8 }}}>
              <Input placeholder="期号，如：(19001)" value={mainData.issue} onChange={e => inputChange(e.target.value, 'issue')}/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={18}>
            <FormItem label="红球" labelCol={{sm: {span: 4}}} wrapperCol={{sm: { span: 20 }}}>
              <div style={{
                display: 'flex',
                paddingTop: '6px',
                flexWrap: 'wrap'}}>
                {
                  redBalls.map((n: number, i: number) => {
                    return <div key={n} style={this.setActive('red', reds, n)} onClick={() => selectBall(n, 'red')}>{n}</div>
                  })
                }
              </div>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={18}>
            <FormItem label="蓝球" labelCol={{sm: {span: 4}}} wrapperCol={{sm: { span: 20 }}}>
              <div style={{
                display: 'flex',
                paddingTop: '6px',
                flexWrap: 'wrap'}}>
                {
                  blueBalls.map((n: number, i: number) => {
                    return <div key={n} style={this.setActive('blue', blues, n)} onClick={() => selectBall(n, 'blue')}>{n}</div>
                  })
                }
              </div>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={18}>
            <FormItem label="奖金池" labelCol={{sm: {span: 4}}} wrapperCol={{sm: { span: 8 }}}>
              <Input placeholder="奖金池" value={mainData.pool} onChange={e => inputChange(e.target.value, 'pool')}/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label="一等奖注数" labelCol={{sm: {span: 6}}} wrapperCol={{sm: { span: 12 }}}>
              <Input placeholder="一等奖注数" value={mainData.prizeOneNum} onChange={e => inputChange(e.target.value, 'prizeOneNum')}/>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="一等奖奖金" labelCol={{sm: {span: 6}}} wrapperCol={{sm: { span: 12 }}}>
              <Input placeholder="一等奖奖金" value={mainData.prizeOne} onChange={e => inputChange(e.target.value, 'prizeOne')}/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label="二等奖注数" labelCol={{sm: {span: 6}}} wrapperCol={{sm: { span: 12 }}}>
              <Input placeholder="二等奖注数" value={mainData.prizeTwoNum} onChange={e => inputChange(e.target.value, 'prizeTwoNum')}/>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="二等奖奖金" labelCol={{sm: {span: 6}}} wrapperCol={{sm: { span: 12 }}}>
              <Input placeholder="二等奖奖金" value={mainData.prizeTwo} onChange={e => inputChange(e.target.value, 'prizeTwo')}/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={18}>
            <FormItem label="总投注金额" labelCol={{sm: {span: 4}}} wrapperCol={{sm: { span: 8 }}}>
              <Input placeholder="总投注金额" value={mainData.bettingNum} onChange={e => inputChange(e.target.value, 'bettingNum')}/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={18}>
            <FormItem label="开奖日期" labelCol={{sm: {span: 4}}} wrapperCol={{sm: { span: 8 }}}>
              <DatePicker onChange={(e) => inputChange(e, 'drawDate')} value={mainData.drawDate}/>
              {/* <Input placeholder="开奖日期" value={mainData.drawDate} onChange={e => inputChange(e.target.value, 'drawDate')}/> */}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24} offset={3}>
            <Button onClick={save} type="primary">保存</Button>
            <Button onClick={this.back}>取消</Button>
          </Col>
        </Row>
      </Form>
    </React.Fragment>
    
  }
}