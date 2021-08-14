import * as React from 'react'
import {inject, observer} from 'mobx-react'
import { Row, Col, Form, Input, Button, DatePicker, Table, Modal, Select } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { IBall } from '@models/ball'

const FormItem = Form.Item


@inject('ballTrendStore')
@observer
export default class BallTrend extends React.Component<ICommonProps> {
  
  state = {
    visible: false
  }
  
  redBalls: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    31, 32, 33
  ]
  blueBalls: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

  columns: ColumnProps<IBall>[] = [{
    title: '期号',
    dataIndex: 'issue',
    // width: '15%',
  },
  // red balls
  {title: () => <div style={{color: '#f5464680'}}>1</div>, dataIndex: '1', render: (text: number, record: IBall, index: number) => this.setBall(record, 1, 'red')},
  {title: () => <div style={{color: '#f5464680'}}>2</div>, dataIndex: '2', render: (text: number, record: IBall, index: number) => this.setBall(record, 2, 'red')},
  {title: () => <div style={{color: '#f5464680'}}>3</div>, dataIndex: '3', render: (text: number, record: IBall, index: number) => this.setBall(record, 3, 'red')},
  {title: () => <div style={{color: '#f5464680'}}>4</div>, dataIndex: '4', render: (text: number, record: IBall, index: number) => this.setBall(record, 4, 'red')},
  {title: () => <div style={{color: '#f5464680'}}>5</div>, dataIndex: '5', render: (text: number, record: IBall, index: number) => this.setBall(record, 5, 'red')},
  {title: () => <div style={{color: '#f5464680'}}>6</div>, dataIndex: '6', render: (text: number, record: IBall, index: number) => this.setBall(record, 6, 'red')},
  {title: () => <div style={{color: '#f5464680'}}>7</div>, dataIndex: '7', render: (text: number, record: IBall, index: number) => this.setBall(record, 7, 'red')},
  {title: () => <div style={{color: '#f5464680'}}>8</div>, dataIndex: '8', render: (text: number, record: IBall, index: number) => this.setBall(record, 8, 'red')},
  {title: () => <div style={{color: '#f5464680'}}>9</div>, dataIndex: '9', render: (text: number, record: IBall, index: number) => this.setBall(record, 9, 'red')},
  {title: () => <div style={{color: '#f5464680'}}>10</div>, dataIndex: '10', render: (text: number, record: IBall, index: number) => this.setBall(record, 10, 'red')},
  {title: () => <div style={{color: '#f5464680'}}>11</div>, dataIndex: '11', render: (text: number, record: IBall, index: number) => this.setBall(record, 11, 'red')},
  {title: () => <div style={{color: '#f5464680'}}>12</div>, dataIndex: '12', render: (text: number, record: IBall, index: number) => this.setBall(record, 12, 'red')},
  {title: () => <div style={{color: '#f5464680'}}>13</div>, dataIndex: '13', render: (text: number, record: IBall, index: number) => this.setBall(record, 13, 'red')},
  {title: () => <div style={{color: '#f5464680'}}>14</div>, dataIndex: '14', render: (text: number, record: IBall, index: number) => this.setBall(record, 14, 'red')},
  {title: () => <div style={{color: '#f5464680'}}>15</div>, dataIndex: '15', render: (text: number, record: IBall, index: number) => this.setBall(record, 15, 'red')},
  {title: () => <div style={{color: '#f5464680'}}>16</div>, dataIndex: '16', render: (text: number, record: IBall, index: number) => this.setBall(record, 16, 'red')},
  {title: () => <div style={{color: '#f5464680'}}>17</div>, dataIndex: '17', render: (text: number, record: IBall, index: number) => this.setBall(record, 17, 'red')},
  {title: () => <div style={{color: '#f5464680'}}>18</div>, dataIndex: '18', render: (text: number, record: IBall, index: number) => this.setBall(record, 18, 'red')},
  {title: () => <div style={{color: '#f5464680'}}>19</div>, dataIndex: '19', render: (text: number, record: IBall, index: number) => this.setBall(record, 19, 'red')},
  {title: () => <div style={{color: '#f5464680'}}>20</div>, dataIndex: '20', render: (text: number, record: IBall, index: number) => this.setBall(record, 20, 'red')},
  {title: () => <div style={{color: '#f5464680'}}>21</div>, dataIndex: '21', render: (text: number, record: IBall, index: number) => this.setBall(record, 21, 'red')},
  {title: () => <div style={{color: '#f5464680'}}>22</div>, dataIndex: '22', render: (text: number, record: IBall, index: number) => this.setBall(record, 22, 'red')},
  {title: () => <div style={{color: '#f5464680'}}>23</div>, dataIndex: '23', render: (text: number, record: IBall, index: number) => this.setBall(record, 23, 'red')},
  {title: () => <div style={{color: '#f5464680'}}>24</div>, dataIndex: '24', render: (text: number, record: IBall, index: number) => this.setBall(record, 24, 'red')},
  {title: () => <div style={{color: '#f5464680'}}>25</div>, dataIndex: '25', render: (text: number, record: IBall, index: number) => this.setBall(record, 25, 'red')},
  {title: () => <div style={{color: '#f5464680'}}>26</div>, dataIndex: '26', render: (text: number, record: IBall, index: number) => this.setBall(record, 26, 'red')},
  {title: () => <div style={{color: '#f5464680'}}>27</div>, dataIndex: '27', render: (text: number, record: IBall, index: number) => this.setBall(record, 27, 'red')},
  {title: () => <div style={{color: '#f5464680'}}>28</div>, dataIndex: '28', render: (text: number, record: IBall, index: number) => this.setBall(record, 28, 'red')},
  {title: () => <div style={{color: '#f5464680'}}>29</div>, dataIndex: '29', render: (text: number, record: IBall, index: number) => this.setBall(record, 29, 'red')},
  {title: () => <div style={{color: '#f5464680'}}>30</div>, dataIndex: '30', render: (text: number, record: IBall, index: number) => this.setBall(record, 30, 'red')},
  {title: () => <div style={{color: '#f5464680'}}>31</div>, dataIndex: '31', render: (text: number, record: IBall, index: number) => this.setBall(record, 31, 'red')},
  {title: () => <div style={{color: '#f5464680'}}>32</div>, dataIndex: '32', render: (text: number, record: IBall, index: number) => this.setBall(record, 32, 'red')},
  {title: () => <div style={{color: '#f5464680'}}>33</div>, dataIndex: '33', render: (text: number, record: IBall, index: number) => this.setBall(record, 33, 'red')},
  // blue balls
  {title: () => <div style={{color: '#3399ff80'}}>1</div>, dataIndex: 'blue-1', render: (text: number, record: IBall, index: number) => this.setBall(record, 1, 'blue')},
  {title: () => <div style={{color: '#3399ff80'}}>2</div>, dataIndex: 'blue-2', render: (text: number, record: IBall, index: number) => this.setBall(record, 2, 'blue')},
  {title: () => <div style={{color: '#3399ff80'}}>3</div>, dataIndex: 'blue-3', render: (text: number, record: IBall, index: number) => this.setBall(record, 3, 'blue')},
  {title: () => <div style={{color: '#3399ff80'}}>4</div>, dataIndex: 'blue-4', render: (text: number, record: IBall, index: number) => this.setBall(record, 4, 'blue')},
  {title: () => <div style={{color: '#3399ff80'}}>5</div>, dataIndex: 'blue-5', render: (text: number, record: IBall, index: number) => this.setBall(record, 5, 'blue')},
  {title: () => <div style={{color: '#3399ff80'}}>6</div>, dataIndex: 'blue-6', render: (text: number, record: IBall, index: number) => this.setBall(record, 6, 'blue')},
  {title: () => <div style={{color: '#3399ff80'}}>7</div>, dataIndex: 'blue-7', render: (text: number, record: IBall, index: number) => this.setBall(record, 7, 'blue')},
  {title: () => <div style={{color: '#3399ff80'}}>8</div>, dataIndex: 'blue-8', render: (text: number, record: IBall, index: number) => this.setBall(record, 8, 'blue')},
  {title: () => <div style={{color: '#3399ff80'}}>9</div>, dataIndex: 'blue-9', render: (text: number, record: IBall, index: number) => this.setBall(record, 9, 'blue')},
  {title: () => <div style={{color: '#3399ff80'}}>10</div>, dataIndex: 'blue-10', render: (text: number, record: IBall, index: number) => this.setBall(record, 10, 'blue')},
  {title: () => <div style={{color: '#3399ff80'}}>11</div>, dataIndex: 'blue-11', render: (text: number, record: IBall, index: number) => this.setBall(record, 11, 'blue')},
  {title: () => <div style={{color: '#3399ff80'}}>12</div>, dataIndex: 'blue-12', render: (text: number, record: IBall, index: number) => this.setBall(record, 12, 'blue')},
  {title: () => <div style={{color: '#3399ff80'}}>13</div>, dataIndex: 'blue-13', render: (text: number, record: IBall, index: number) => this.setBall(record, 13, 'blue')},
  {title: () => <div style={{color: '#3399ff80'}}>14</div>, dataIndex: 'blue-14', render: (text: number, record: IBall, index: number) => this.setBall(record, 14, 'blue')},
  {title: () => <div style={{color: '#3399ff80'}}>15</div>, dataIndex: 'blue-15', render: (text: number, record: IBall, index: number) => this.setBall(record, 15, 'blue')},
  {title: () => <div style={{color: '#3399ff80'}}>16</div>, dataIndex: 'blue-16', render: (text: number, record: IBall, index: number) => this.setBall(record, 16, 'blue')}]

  viewDetail (data: IBall) {
    this.props.history.push(`/home/lottery-ball/${data.id}`)
  }

  showDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '删除后该条记录将无法恢复',
      onOk: () => this.props.ballTrendStore.deleteBall(id)
    })
  }

  setBall = (data: IBall, num: number, type: 'red'|'blue') => {
    const color =  type === 'red' ? '#f54646' : '#3399ff'
    const active = type === 'red' ? data.reds.some(v => v === num) : data.blue === num
    if (active) {
      return <div style={{width: '16px', height: '16px', borderRadius: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: color, color: '#fff', fontSize: '12px', margin: 'auto'}}>{num}</div>
    }
    return ''//<div style={{textAlign: 'center', color: color + '60', fontSize:'12px'}}>{num}</div>
  }

  setColor = (num: number, type: string) => {
    return <div style={{textAlign: 'center', color: type}}>{num}</div>
  }

  showRule = () => {
    this.setState({visible: !this.state.visible})
  }
  
  componentDidMount () {
    this.props.ballTrendStore.search()
  }

  render () {
    const { visible } = this.state
    const { value, loading, list, meta, drawDate, inputChange, search, clear } = this.props.ballTrendStore
 
    return <React.Fragment>
      <Modal
        className="large-modal"
        title='中奖规则'
        keyboard={true}
        visible={visible}
        onOk={() => this.showRule()}
        onCancel={() => this.showRule()}>
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
      <Form className="search-form">
        <h3>双色球趋势</h3>
        <Row gutter={24}>
          <Col span={6}>
            <FormItem>
              <Input placeholder="期号查询，如:(18001,18010)" onChange={e => inputChange(e.target.value, 'issue')} value={value.issue}/>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem>
              <DatePicker.RangePicker onChange={(e) => inputChange(e, 'drawDate')} value={drawDate}/>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem>
              <Select value={value.pageSize} onChange={e => inputChange(e, 'pageSize')}>
                <Select.Option value={40}>最近40期</Select.Option>
                <Select.Option value={60}>最近60期</Select.Option>
                <Select.Option value={100}>最近100期</Select.Option>
              </Select>
            </FormItem>
          </Col>
            
        </Row>
        <Row className="search-btn-w">
          <Col span={24}>
            <Button onClick={this.showRule}>中奖规则</Button>
            <Button onClick={clear}>清空</Button>
            <Button type="primary" onClick={search}>搜索</Button>
          </Col>
        </Row>
      </Form>
      <Table
        bordered
        className="trend-table-list"
        columns={this.columns}
        rowKey={(record: any) => record.id}
        dataSource={list}
        pagination={meta}
        loading={loading}
        onChange={search}
      />
    </React.Fragment>
    
  }
}