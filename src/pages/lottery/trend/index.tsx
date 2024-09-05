import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Row, Col, Form, Input, Button, DatePicker, Table, Modal, Select,
  Flex, Space, Spin, TableColumnProps, TableColumnsType, TablePaginationConfig
} from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { IBall } from '@models/ball'
import { useList } from './useTrend'
import { modal } from 'components/message'

const FormItem = Form.Item


const BallTrendPage: React.FC = () => {

  const [open, setOpen] = useState(false)

  const redBalls = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    31, 32, 33
  ]
  const blueBalls = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

  const navigate = useNavigate()

  const {
    form,
    loading,
    pageData,
    onQuery
  } = useList()

  const BallCom: React.FC<{
    ball: number
    color: string
  }> = ({
    ball,
    color
  }) => {
    return <div style={{color}}>{ball}</div>
  }

  const columns: ColumnProps<IBall>[] = [{
    title: '期号',
    dataIndex: 'issue',
    align: 'center',
    // width: '15%',
  },
  // red balls
  ...redBalls.map<ColumnProps<IBall>>(i => ({
    title: <BallCom ball={i} color='#f5464680' />,
    dataIndex: i,
    align: 'center',
    render: (text, record, index: number) => setBall(record, i, 'red')
  })),
  ...blueBalls.map<ColumnProps<IBall>>(i => ({
    title: <BallCom ball={i} color='#3399ff80' />,
    dataIndex: i,
    align: 'center',
    render: (text, record, index: number) => setBall(record, i, 'blue')
  })),
]

  const onView = (data: IBall) => {
    navigate(`/lottery-ball/${data.id}`)
  }

  const showDelete = (id: string) => {
    modal.confirm({
      title: '确认删除',
      content: '删除后该条记录将无法恢复',
      // onOk: () => this.props.ballTrendStore.deleteBall(id)
    })
  }

  const setBall = (data: IBall, num: number, type: 'red'|'blue') => {
    const color =  type === 'red' ? '#f54646' : '#3399ff'
    const active = type === 'red' ? data.reds.some(v => v === num) : data.blue === num
    if (active) {
      return <div style={{width: '16px', height: '16px', borderRadius: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: color, color: '#fff', fontSize: '12px', margin: 'auto'}}>{num}</div>
    }
    return ''//<div style={{textAlign: 'center', color: color + '60', fontSize:'12px'}}>{num}</div>
  }

  const showRule = () => {
    setOpen(x => !x)
  }
 
  const onChange = ({current, pageSize}: TablePaginationConfig, filters: any, sorter: any) => {
    const order = sorter.order, _order: any = {}
    if(order) {
      const field = sorter.columnKey!
      _order[field] = sorter.order === 'ascend' ? 'ASC' : 'DESC'
    }
    onQuery(current, pageSize, _order)
  }

  return <Spin spinning={loading}>
      <Modal
        className="large-modal"
        title='中奖规则'
        keyboard={true}
        open={open}
        onOk={() => showRule()}
        onCancel={() => showRule()}>
        <table className='rules-table'><tbody>
          <tr>
            <td rowSpan={2}>奖级</td>
            <td colSpan={2}>中奖条件</td>
            <td rowSpan={2}>中奖说明</td>
            <td rowSpan={2} style={{width: '520px'}}>单注奖金说明</td>
            <td rowSpan={2}>收益倍数</td>
          </tr>
          <tr>
            <td>红球</td>
            <td>蓝球</td>
          </tr>
          <tr>
            <td>一等奖</td>
            <td>
              <div className="ball red"></div>
              <div className="ball red"></div>
              <div className="ball red"></div>
              <div className="ball red"></div>
              <div className="ball red"></div>
              <div className="ball red"></div>
            </td>
            <td><div className="ball blue"></div></td>
            <td>6+1</td>
            <td>
              当奖池资金低于1亿元时，奖金总额为当期高等奖奖金的70%与奖池中累积的奖金之和，单注奖金按注均分，单注最高限额封顶500万元。
              当奖池资金高于1亿元（含）时，奖金总额包括两部分，一部分为当期高等奖奖金的50%与奖池中累积的奖金之和，单注奖金按注均分，单注最高限额封顶500万元；另一部分为当期高等奖奖金的20%，单注奖金按注均分，单注最高限额封顶500万元。
            </td>
            <td>浮动</td>
          </tr>
          <tr>
            <td>二等奖</td>
            <td>
              <div className="ball red"></div>
              <div className="ball red"></div>
              <div className="ball red"></div>
              <div className="ball red"></div>
              <div className="ball red"></div>
              <div className="ball red"></div>
            </td>
            <td></td>
            <td>6+0</td>
            <td>当期高等奖奖金的30%</td>
            <td>浮动</td>
          </tr>
          <tr>
            <td>三等奖</td>
            <td>
              <div className="ball red"></div>
              <div className="ball red"></div>
              <div className="ball red"></div>
              <div className="ball red"></div>
              <div className="ball red"></div>
            </td>
            <td><div className="ball blue"></div></td>
            <td>5+1</td>
            <td>单注奖金额固定为3000元</td>
            <td>1500</td>
          </tr>
          <tr>
            <td rowSpan={2}>四等奖</td>
            <td>
              <div className="ball red"></div>
              <div className="ball red"></div>
              <div className="ball red"></div>
              <div className="ball red"></div>
              <div className="ball red"></div>
            </td>
            <td></td>
            <td>5+0</td>
            <td rowSpan={2}>单注奖金额固定为200元</td>
            <td rowSpan={2}>100</td>
          </tr>
          <tr>
            <td>
              <div className="ball red"></div>
              <div className="ball red"></div>
              <div className="ball red"></div>
              <div className="ball red"></div>
            </td>
            <td>
              <div className="ball blue"></div>
            </td>
            <td>4+1</td>
          </tr>
          <tr>
            <td rowSpan={2}>五等奖</td>
            <td>
              <div className="ball red"></div>
              <div className="ball red"></div>
              <div className="ball red"></div>
              <div className="ball red"></div>
            </td>
            <td></td>
            <td>4+0</td>
            <td rowSpan={2}>单注奖金额固定为10元</td>
            <td rowSpan={2}>5</td>
          </tr>
          <tr>
            <td>
              <div className="ball red"></div>
              <div className="ball red"></div>
              <div className="ball red"></div>
            </td>
            <td><div className="ball blue"></div></td>
            <td>3+1</td>
          </tr>
          <tr>
            <td rowSpan={3}>六等奖</td>
            <td>
              <div className="ball red"></div>
              <div className="ball red"></div>
            </td>
            <td><div className="ball blue"></div></td>
            <td>2+1</td>
            <td rowSpan={3}>单注奖金额固定为5元</td>
            <td rowSpan={3}>2.5</td>
          </tr>
          <tr>
            <td><div className="ball red"></div></td>
            <td><div className="ball blue"></div></td>
            <td>1+1</td>
          </tr>
          <tr><td></td><td><div className="ball blue"></div></td><td>0+1</td></tr>
        </tbody></table> </Modal>
    <Form
      form={form}
      className="form"
    >
        <h3>双色球趋势</h3>
        <Row gutter={24}>
        <Col span={6}>
          <Form.Item name="issue">
            <Input placeholder="期号查询，如:(18001,18010)"/>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="drawDate">
            <DatePicker.RangePicker/>
          </Form.Item>
        </Col>
          <Col span={6}>
            <FormItem name="pageSize">
              <Select options={[40,60,100].map(value => ({label: `最近${value}期`, value}))} />
            </FormItem>
          </Col>
        </Row>
        <Flex justify={'end'}>
        <Space>
          <Button onClick={showRule}>中奖规则</Button>
          <Button onClick={() => form.resetFields()}>
            清空
          </Button>
          <Button type="primary" onClick={() => onQuery()}>
            搜索
          </Button>
        </Space>
      </Flex>
      </Form>
      
    <Table
      className='trend-table-list'
      bordered
      size='small'
      columns={columns}
      rowKey={(record: any) => record.id}
      dataSource={pageData.data}
      pagination={pageData.meta}
      onChange={onChange}
    />
  </Spin>
}

export default BallTrendPage
