import * as React from 'react'
import { useHistory } from 'react-router-dom'
import {
  Row, Col, Form, Input, Button, Table, Modal,
  Flex, Space, Spin, TableColumnsType
} from 'antd'
import { DatePicker } from 'components/datePicker'
import { IBall } from '@models/ball'
import { useList } from './useBallList'
import { ColumnsType, TablePaginationConfig, SorterResult, SortOrder } from 'antd/lib/table/interface'


const BallListPage: React.FC = () => {

  const history = useHistory()

  const {
    form,
    loading,
    pageData,
    onQuery
  } = useList()

  const columns: TableColumnsType<IBall> = [{
    title: '期号',
    dataIndex: 'issue',
    // width: '15%',
  }, {
    title: '红球号码',
    children: [{
      title: '1',
      dataIndex: 'red1',
      width: '30px',
      render: (text: number, record, index: number) => setColor(text, 'red')
    }, {
      title: '2',
      dataIndex: 'red2',
      width: '30px',
      render: (text: number, record, index: number) => setColor(text, 'red')
    }, {
      title: '3',
      dataIndex: 'red3',
      width: '30px',
      render: (text: number, record, index: number) => setColor(text, 'red')
    }, {
      title: '4',
      dataIndex: 'red4',
      width: '30px',
      render: (text: number, record, index: number) => setColor(text, 'red')
    }, {
      title: '5',
      dataIndex: 'red5',
      width: '30px',
      render: (text: number, record, index: number) => setColor(text, 'red')
    }, {
      title: '6',
      dataIndex: 'red6',
      width: '30px',
      render: (text: number, record, index: number) => setColor(text, 'red')
    }]
  }, {
    title: '蓝球',
    dataIndex: 'blue',
    width: '30px',
    render: (text: number, record, index: number) => setColor(text, 'blue')
  }, {
    title: '奖池奖金(元)',
    dataIndex: 'pool',
    render: (text: number) => showMoney(text)
  }, {
    title: '一等奖',
    children: [{
      title: '注数',
      dataIndex: 'prizeOneNum'
    }, {
      title: '奖金(元)',
      dataIndex: 'prizeOne',
      render: (text: number) => showMoney(text)
    }]
  }, {
    title: '二等奖',
    children: [{
      title: '注数',
      dataIndex: 'prizeTwoNum'
    }, {
      title: '奖金(元)',
      dataIndex: 'prizeTwo',
      render: (text: number) => showMoney(text)
    }]
  }, {
    title: '总投注额(元)',
    dataIndex: 'bettingNum',
    render: (text: number) => showMoney(text)
  }, {
    title: '开奖日期',
    width: '100px',
    dataIndex: 'drawDate',
    key: 'drawDate',
    sorter: true
  }, {
    title: '操作',
    dataIndex: '',
    width: '80px',
    render: (text: string, record: IBall, index: number) => <React.Fragment><a onClick={() => onVeiw(record)}>详情</a>|<a onClick={() => showDelete(record.id)}>删除</a></React.Fragment>
  }]

  const onVeiw = (data: IBall) => {
    history.push(`/lottery/ball/detail/${data.id}`)
  }

  const showDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '删除后该条记录将无法恢复',
      // onOk: () => this.props.ballListStore.deleteBall(id)
    })
  }

  const showMoney = (num: number) => {
    return (num + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const setColor = (num: number, type: string) => {
    const color =  type === 'red' ? '#f54646' : '#39f'
    return <div style={{textAlign: 'center', color: color}}>{num}</div>
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
    <Form
      form={form}
      className="search-form"
    >
      <h3>双色球列表</h3>
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
      </Row>
      <Flex justify={'end'}>
        <Space>
          <Button type='primary' ghost onClick={() => history.push('comment-edit')}>
            Create
          </Button>
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

export default BallListPage