import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Input, Button, Table, Modal, Badge, Flex, Space, Spin } from 'antd'
import { object2Str } from '@utils/tools'
import { ColumnProps } from 'antd/lib/table'
import styles from './style.module.scss'
import { APILog, RequestStatus } from 'types/api'
import { useApi } from './useApi'
import { DatePicker } from 'components/datePicker'

const FormItem = Form.Item

type TStatus = 'default'|'success'|'warning'|'error'

const APILogPage: React.FC = () => {

  const {
    form,
    loading,
    pageData,
    onQuery,
  } = useApi()

  const [state, setState] = useState({
    modalTitle: '参数详情',
    visible: false,
    modalTxt: '',
    visibleLog: false,
    detailInfo: {}
  })

  const columns: ColumnProps<AnyObject>[] = [{
    title: 'ID',
    dataIndex: 'id',
    // render: (name: any) => `${name.first} ${name.last}`,
    width: '12%',
  }, {
  //   title: 'Path',
  //   dataIndex: 'path',
  //   // filters: [
  //   //   { text: 'Male', value: 'male' },
  //   //   { text: 'Female', value: 'female' },
  //   // ],
  //   width: '100px',
  // }, {
    title: 'Url',
    dataIndex: 'url',
    width: '120px',
    render: (text: string, record: any, index: number) => <div onClick={() => showParamsDetail(record.url, 'url')} className="textflow-4"> {text} </div>,
  }, {
    title: '请求方式',
    dataIndex: 'method',
    width: '60px',
  }, {
    title: '参数',
    width: 400,
    dataIndex: 'params',
    render: (text: string, record: any, index: number) => <div onClick={() => showParamsDetail(record.params, 'params')} className="textflow-4"> {object2Str(text)} </div>,
  }, {
    title: '状态',
    dataIndex: 'status',
    width: '60px',
    render: (text: string, record: any, index: number) => <Badge status={getStatus(text)} text={text}/>,
  }, {
    title: '创建时间',
    width: '120px',
    dataIndex: 'createdAt',
    sorter: true
  }, {
    title: '耗时(ms)',
    dataIndex: 'time',
    width: '60px',
  }, {
    title: '操作',
    dataIndex: '',
    width: '80px',
    fixed: 'right',
    render: (text: string, record: any, index: number) => <Button size="small" type="primary" onClick={() => viewDetail(record)}>详情</Button>,
  }]

  const object2Str = (o: string|object): string => {
    return typeof o === 'string' ? o : JSON.stringify(o)
  }

  // 查看Url/参数详情
  const showParamsDetail = (str: any, type?: string) => {
    if (str) {
      setState({
        modalTitle: type === 'url' ? 'Url详情' : '参数详情',
        visible: !state.visible,
        modalTxt: object2Str(str)
      })
    } else {
      setState({ visible: false })
    }
    
  }

  // 查看日志详情
  const viewDetail = (data: any) => {
    if (data) {
      setState({
        visibleLog: true,
        detailInfo: data
      })
    } else {
      setState({
        visibleLog: false,
      })
    }
    
  }

  const formatHeader = (data: any) => {
    const type = typeof(data)
    if (type === 'string') {
      let headerObj = ''
      try {
        headerObj = JSON.parse(data)
      } catch (e) {
        if (data.length > 10240) {
          return data.substr(0, 1024) + '...'
        }
        return data
      }
      return Object.keys(headerObj).map(h => {
        return <div key={h}>{h} : {headerObj[h]}</div>
      })
    } else if (type === 'object') {
      return Object.keys(data).map(h => {
        return <div key={h}>{h} : {data[h]}</div>
      })
    } else {
      return ''
    }
  }

  const wrapHtml = (data: any) => {
    if (data && Object.keys(data).length > 0) {
      return <React.Fragment>
        <div className="row">
          <div>ID：</div><div>{data.id}</div>
        </div>
        <div className="row">
          <div>IP：</div><div>{data.ip}</div>
        </div>
        <div className="row">
          <div>Url：</div><div>{data.url}</div>
        </div>
        <div className="row">
          <div>Path：</div><div>{data.path}</div>
        </div>
        <div className="row">
          <div>参数：</div><div>{object2Str(data.params)}</div>
        </div>
        <div className="row">
          <div>请求头：</div><div>{formatHeader(data.headers)}</div>
        </div>
        <div className="row">
          <div>响应头：</div><div>{formatHeader(data.resHeaders || data.responseHeaders)}</div>
        </div>
        <div className="row">
          <div>响应参数：</div><div>{object2Str(data.resData)}</div>
        </div>
        <div className="row">
          <div>创建时间：</div><div>{data.createdAt}</div>
        </div>
        <div className="row">
          <div>状态：</div><div>{data.status}</div>
        </div>
        <div className="row">
          <div>耗时：</div><div>{data.time}ms</div>
        </div>
      </React.Fragment>
    } else {
      return ''
    }
  }

  // 获取状态badge
  const getStatus = (status: any): TStatus => {
    let info: TStatus = 'default'
    switch (status) {
      case 200 :
      case 201 :
        info = 'success'
        break
      case 400 :
      case 401 :
      case 403 :
      case 404 :
      case 405 :
      case 406 :
        info = 'warning'
        break
      case 500 :
      case 501 :
      case 502 :
      case 503 :
      case 504 :
      case 505 :
        info = 'error'
        break

      default :
        info = 'default'
        break
    }
    return info
  }
  
  const { modalTitle, visible, modalTxt, visibleLog, detailInfo } = state
  // const { value, loading, list, meta, inputChange, search, clear } = this.props.apiLogStore

  console.log(pageData, '--------------')
 
  return <Spin spinning={loading}>
    <Form
      form={form}
      className="search-form"
      onFinish={(vals) => {
        
      }}
    >
      <h3>API请求日志</h3>
      <Row gutter={24}>
        <Col span={6}>
          <Form.Item name="path">
            <Input placeholder="path"/>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="url">
            <Input placeholder="url"/>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="_createdAt">
            <DatePicker.RangePicker />
          </Form.Item>
        </Col>
      </Row>
      <Flex className='mgb16' justify={'end'}>
        <Space>
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
      // bordered
      // className="table-list"
      // scroll={{x: 1600}}
      size='small'
      columns={columns}
      rowKey={(record: any) => record.id}
      dataSource={pageData.data}
      pagination={pageData.meta}
      onChange={({current, pageSize}) => onQuery(current, pageSize)}
    />

    <Modal
      title={modalTitle}
      keyboard={true}
      open={visible}
      onOk={() => showParamsDetail('')}
      onCancel={() => showParamsDetail('')}
    > {modalTxt} </Modal>
    <Modal
      className={styles["large-modal"]}
      title="日志详情"
      width={'80%'}
      style={{ top: 40 }}
      keyboard={true}
      open={visibleLog}
      onOk={() => viewDetail('')}
      onCancel={() => viewDetail('')}
    > {wrapHtml(detailInfo)} </Modal>
  </Spin>
}

export default APILogPage
