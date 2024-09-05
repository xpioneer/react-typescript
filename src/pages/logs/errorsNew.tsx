import React from 'react'
import {
  Row, Col, Form, Input, Button, Flex, Space,
  Table, Badge, TableColumnProps,
  Spin,
} from 'antd'
import { DatePicker } from 'components/datePicker'
import { object2Str } from '@utils/tools'
import { ErrorLog } from 'types/apiError'
import { RequestStatus } from 'types/api'
import { useErrors } from './useErrors'
import styles from './style.module.scss'
import { JSONView } from 'components/jsonView'
import { modal } from 'components/message'

const ErrorsLogPage: React.FC = () => {

  const {
    form,
    loading,
    pageData,
    onQuery,
  } = useErrors()

  const columns: TableColumnProps<ErrorLog>[] = [{
    title: 'ID',
    dataIndex: 'id',
    sorter: true,
    // render: (name: any) => `${name.first} ${name.last}`,
    width: '120px',
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
    render: (value: string, record) => <div onClick={() => showParamsDetail(value, 'url')} className="textflow-4"> {value} </div>,
  }, {
    title: '请求方式',
    dataIndex: 'method',
    width: '60px',
  }, {
    title: '参数',
    dataIndex: 'params',
    render: (value: string, record) => <div onClick={() => showParamsDetail(value, '参数')} className="textflow-4"> {object2Str(value)} </div>,
  }, {
    title: '错误信息',
    dataIndex: 'msg',
    render: (value: string, record) => <div onClick={() => showParamsDetail(record.errors, '错误信息')} className="textflow-4"> {value} </div>,
  }, {
    title: '状态',
    dataIndex: 'status',
    width: '60px',
    render: (value: string, record) => <Badge status={getStatus(value)} text={value}/>,
  }, {
    title: '创建时间',
    width: '120px',
    dataIndex: 'createdAt',
  }, {
    title: '耗时(ms)',
    dataIndex: 'time',
    width: '60px',
  }, {
    title: '操作',
    dataIndex: '',
    width: '60px',
    fixed: 'right',
    render: (text: string, record) => <Button size="small" type="primary" onClick={() => onViewDetail(record)}>详情</Button>,
  }]

  // 查看Url/参数详情
  const showParamsDetail = (data: any, title: string) => {
    if(typeof data === 'string') {
      modal.info({
        title,
        content: data,
      })
    } else {
      modal.info({
        title,
        width: '75%',
        className: styles.large,
        content: <JSONView data={data} />,
      })
    }
  }

  // 查看日志详情
  const onViewDetail = (data: any) => {
    modal.info({
      title: '日志详情',
      width: '75%',
      className: styles.large,
      content: wrapHtml(data)
    })
  }

  // 日志详情页面
  const wrapHtml = (data: ErrorLog) => {
    if (data !== null && Object.keys(data).length > 0) {
      return <React.Fragment>
        <div className="row">
          <div>ID：</div><div>{data.id}</div>
        </div>
        <div className="row">
          <div>IP：</div><div>{data.ip}</div>
        </div>
        <div className="row">
          <div>错误信息：</div><div>{data.msg}</div>
        </div>
        <div className="row">
          <div>堆栈信息：</div>
          <div>
            <JSONView data={data.errors} />
          </div>
        </div>
        <div className="row">
          <div>Url：</div><div>{data.url}</div>
        </div>
        <div className="row">
          <div>Path：</div><div>{data.path}</div>
        </div>
        <div className="row">
          <div>参数：</div>
          <div>
            <JSONView data={data.params} />
          </div>
        </div>
        <div className="row">
          <div>请求头：</div>
          <div>
            <JSONView data={data.headers} />
          </div>
        </div>
        <div className="row">
          <div>响应头：</div>
          <div>
            <JSONView data={data.resHeaders} />
          </div>
        </div>
        <div className="row">
          <div>响应参数：</div>
          <JSONView data={data.resData}/>
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
  const getStatus = (status: any): RequestStatus => {
    let info: RequestStatus = 'default'
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
 
  return <Spin spinning={loading}>
    <Form className="form" form={form}>
      <h3>错误日志</h3>
      <Row gutter={24}>
        <Col span={6}>
          <Form.Item name="path">
            <Input placeholder="path" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="url">
            <Input placeholder="url" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="msg">
            <Input placeholder="错误信息" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item>
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
      size='small'
      scroll={{x: 1600}}
      columns={columns}
      rowKey={(record: any) => record.id}
      dataSource={pageData.data}
      pagination={pageData.meta}
      onChange={({current, pageSize}) => onQuery(current, pageSize)}
    />
  </Spin>
}

export default ErrorsLogPage
