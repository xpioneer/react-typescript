import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { 
  Row, Col, Form, Input, Button, Table, Modal, Checkbox,
  Flex, Space, Spin, TableColumnProps, TableColumnsType, TablePaginationConfig
} from 'antd'
import { DatePicker } from 'components/datePicker'
import { IBall } from '@models/ball'
import { useCreate } from './useDetail'
import styles from './style.module.scss'
import classNames from 'classnames'

interface IProps {
  total?: number
  red?: boolean
  value?: number[]
  onChange?: (value?: number[]) => void
}


const BallSelectList: React.FC<IProps> = ({
  total = 33,
  red = true,
  value = [],
  onChange,
}) => {

  const [vals, setVals] = useState<Array<number>>(value)

  const onClick = (ball: number) => {
    if(red) {
      let index = vals.findIndex(v => v === ball)
      if (index >= 0) { // selected, delete
        vals.splice(index, 1)
      } else { // not selected
        console.log('not ', vals, ball)
        if (vals.length < 6) { // and length < 6
          vals.push(ball)
        }
      }
    } else {
      vals.splice(0, 1, ball)
    }
    setVals([...vals])
    onChange && onChange(vals)
  }

  useEffect(() => {
    // setVals(value)
  }, [value])

  console.log('ball', value, vals)

  return <Space>
    {
      Array(total).fill(0).map((n, i) => {
        const ball = i + 1
        return <Flex
          justify='center'
          align='center'
          key={ball}
          className={classNames(styles.ball, {
            [styles.blue]: !red,
            [styles.active]: vals.includes(ball)
          })}
          onClick={() => onClick(ball)}
        >{ball}</Flex>
      })
    }
  </Space>
}

const BallCreatePage: React.FC = () => {

  const history = useHistory()

  const {
    form,
    loading,
    onSave,
  } = useCreate()

  const style = {
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

  const setActive = (type: 'red'|'blue', selected: [number], num: number) => {
    const color =  type === 'red' ? '#f54646' : '#39f'
    if (selected.some((v, i) => num === v)) {
      let _style = JSON.parse(JSON.stringify(style[type]))
      _style['backgroundColor'] = color
      _style['color'] = '#fff'
      return _style
    } else {
      return style[type]
    }
  }

  return <Spin spinning={loading}>
    <Form form={form} className="search-form" layout="horizontal">
      <h3>新增一期双色球</h3>
      <Row gutter={24}>
        <Col span={18}>
          <Form.Item name='issue' label="期号" labelCol={{sm: {span: 4}}} wrapperCol={{sm: { span: 8 }}}>
            <Input placeholder="期号，如：(19001)"/>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={18}>
          <Form.Item label="红球" labelCol={{sm: {span: 4}}} wrapperCol={{sm: { span: 20 }}}>
            <BallSelectList />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={18}>
          <Form.Item label="蓝球" labelCol={{sm: {span: 4}}} wrapperCol={{sm: { span: 20 }}}>
            <BallSelectList total={16} red={false} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={18}>
          <Form.Item name='pool' label="奖金池" labelCol={{sm: {span: 4}}} wrapperCol={{sm: { span: 8 }}}>
            <Input placeholder="奖金池" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item name='prizeOneNum' label="一等奖注数" labelCol={{sm: {span: 6}}} wrapperCol={{sm: { span: 12 }}}>
            <Input placeholder="一等奖注数" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name='prizeOne' label="一等奖奖金" labelCol={{sm: {span: 6}}} wrapperCol={{sm: { span: 12 }}}>
            <Input placeholder="一等奖奖金" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item name='prizeTwoNum' label="二等奖注数" labelCol={{sm: {span: 6}}} wrapperCol={{sm: { span: 12 }}}>
            <Input placeholder="二等奖注数" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name='prizeTwo' label="二等奖奖金" labelCol={{sm: {span: 6}}} wrapperCol={{sm: { span: 12 }}}>
            <Input placeholder="二等奖奖金" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={18}>
          <Form.Item name='bettingNum' label="总投注金额" labelCol={{sm: {span: 4}}} wrapperCol={{sm: { span: 8 }}}>
            <Input placeholder="总投注金额" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={18}>
          <Form.Item name='drawDate' label="开奖日期" labelCol={{sm: {span: 4}}} wrapperCol={{sm: { span: 8 }}}>
            <DatePicker />
            {/* <Input placeholder="开奖日期" value={mainData.drawDate} onChange={e => inputChange(e.target.value, 'drawDate')}/> */}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24} offset={3}>
          <Button onClick={() => {}} type="primary">保存</Button>
          <Button onClick={() => {}}>取消</Button>
        </Col>
      </Row>
    </Form>
  </Spin>
}

export default BallCreatePage