import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { 
  Row, Col, Form, Input, Button, InputNumber, Modal, Checkbox,
  Flex, Space, Spin, TableColumnProps, TableColumnsType, TablePaginationConfig,
  FormItemProps,
} from 'antd'
import { DatePicker } from 'components/datePicker'
import { useDetail } from './useDetail'
import styles from './style.module.scss'
import classNames from 'classnames'

interface IProps {
  total?: number
  red?: boolean
  value?: number[]
  onChange?: (value?: number[]) => void
}

const formLayout: FormItemProps = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8
  }
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
    if(value && value.length > 0)
      setVals(value)
  }, [value])

  return <Space className={styles.ballWrap}>
    {
      Array(total).fill(0).map((n, i) => {
        const ball = i + 1
        return <Flex
          justify='center'
          align='center'
          key={ball}
          className={classNames(styles.ball, {
            [styles.blue]: !red,
            [styles.active]: value.includes(ball)
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
    isEdit,
    loading,
    onSave,
  } = useDetail()

  const requireRule = [{
    required: true
  }]

  return <Spin spinning={loading}>
    <h3>双色球详情</h3>
    <Form
      {...formLayout}
      form={form}
      className="form" layout="horizontal"
      onFinish={onSave}
    >
      <Form.Item hidden name='id' />
      <Row gutter={24}>
        <Col span={18}>
          <Form.Item name='issue' label="期号" rules={requireRule}>
            <Input placeholder="期号，如：(19001)"/>
          </Form.Item>
        </Col>
        <Col span={18}>
          <Form.Item name='reds' label="红球" wrapperCol={{ span: 20 }}
             rules={[
              ...requireRule,
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value && value.length === 6) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('6 red balls are needed.'));
                }
              }),
            ]}
          >
            <BallSelectList />
          </Form.Item>
        </Col>
        <Col span={18}>
          <Form.Item name='blue' label="蓝球" wrapperCol={{ span: 20 }} rules={requireRule}>
            <BallSelectList total={16} red={false} />
          </Form.Item>
        </Col>
        <Col span={18}>
          <Form.Item name='pool' label="奖金池" rules={requireRule}>
            <Input placeholder="奖金池" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
          name='prizeOneNum'
          label="一等奖注数"
          labelCol={{span: 6}}
          wrapperCol={{ span: 12 }}
          rules={requireRule}
        >
            <InputNumber placeholder="一等奖注数" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name='prizeOne'
            label="一等奖奖金"
            labelCol={{span: 6}}
            wrapperCol={{ span: 12 }}
            rules={requireRule}
          >
            <InputNumber placeholder="一等奖奖金" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name='prizeTwoNum'
            label="二等奖注数"
            labelCol={{span: 6}}
            wrapperCol={{ span: 12 }}
            rules={requireRule}
          >
            <InputNumber placeholder="二等奖注数" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name='prizeTwo'
            label="二等奖奖金"
            labelCol={{span: 6}}
            wrapperCol={{ span: 12 }}
            rules={requireRule}
          >
            <InputNumber placeholder="二等奖奖金" />
          </Form.Item>
        </Col>
        <Col span={18}>
          <Form.Item name='bettingNum' label="总投注金额" rules={requireRule}>
            <InputNumber placeholder="总投注金额" />
          </Form.Item>
        </Col>
        <Col span={18}>
          <Form.Item name='drawDate' label="开奖日期" rules={requireRule}>
            <DatePicker />
          </Form.Item>
        </Col>
        {
          isEdit && <Col span={18}>
            <Form.Item name='createdAt' label="创建日期">
              <DatePicker disabled={isEdit} />
            </Form.Item>
          </Col>
        }
        <Col span={24} offset={3}>
          <Space>
            <Button htmlType='submit' type="primary">保存</Button>
            <Button onClick={() => history.goBack()}>取消</Button>
          </Space>
        </Col>
      </Row>
    </Form>
  </Spin>
}

export default BallCreatePage