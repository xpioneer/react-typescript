import React, { useState, useEffect } from 'react'
import {
  Row, Col, Form, Input, Button, Table, Badge, Flex, Space, Spin,
  Tooltip,
} from 'antd'
import { ColumnProps } from 'antd/lib/table'
// import styles from './style.module.scss'
import { RequestStatus } from 'types/api'
import { dateFormat } from '@/utils/tools'
import { SystemLog } from '@/types/geolog'
import { useList } from './useList'
import { DatePicker } from '@components/datePicker'
import { JSONView } from '@components/jsonView'
import { modal } from '@components/message'
import { DateFormat } from '@/types/base'

const GeographyLogPage: React.FC = () => {

  const {
    form,
    loading,
    pageData,
    onQuery,
  } = useList()

  const columns: ColumnProps<SystemLog>[] = [{
    title: 'ID',
    dataIndex: 'id',
    // render: (name: any) => `${name.first} ${name.last}`,
    width: '12%',
  }, {
    title: 'IP',
    dataIndex: 'request_ip',
    width: '100px',
  }, {
    title: 'Client',
    dataIndex: 'client_type',
    width: '100px',
    render: (v, data) => <Tooltip title={data.client_version}><div className='textflow-4'>{v}</div></Tooltip>
  }, {
    title: 'Url',
    dataIndex: 'request_url',
    width: '120px',
    render: (v) => <Tooltip title={v}><div className='textflow-4'>{v}</div></Tooltip>
  }, {
    title: '请求方式',
    dataIndex: 'request_method',
    width: '60px',
  }, {
    title: '参数',
    // width: 400,
    dataIndex: 'request_params',
    // render: (text: string, record, index: number) => <div onClick={() => showParamsDetail(record.params, '参数')} className="textflow-4"> {object2Str(text)} </div>,
  }, {
    title: 'geography',
    dataIndex: 'continent_code',
    width: '160px',
    render: (text: string, record) => [
      record.continent_name_en,
      record.country_name_en,
      record.subdivisions_name_en,
      record.city_name_en,
    ].join(','),
  }, {
    title: '地理位置',
    dataIndex: 'continent_name_en',
    width: '160px',
    render: (text: string, record) => [
      record.continent_name_zh,
      record.country_name_zh,
      record.subdivisions_name_zh,
      record.city_name_zh,
    ].join(','),
  }, {
    title: '经纬度',
    dataIndex: 'latitude',
    render: (v, data) => {
      return [data.latitude || '-', data.longitude || '-'].join(',')
    }
  }, {
    title: '状态',
    dataIndex: 'status',
    width: '60px',
    render: (text: string, record) => <Badge status={getStatus(text)} text={text}/>,
  }, {
    title: '创建时间',
    width: '120px',
    dataIndex: 'created_at',
    sorter: true,
    render: (v) => dateFormat(v, DateFormat.DateTimeM)
  }, {
    title: '耗时(ms)',
    dataIndex: 'time',
    width: '60px',
  }, {
    title: '操作',
    dataIndex: '',
    width: '60px',
    fixed: 'right',
    render: (text: string, record, index: number) => <Button size="small" type="primary" onClick={() => onViewDetail(record)}>详情</Button>,
  }]

  // 查看日志详情
  const onViewDetail = (data: any) => {
    modal.info({
      title: '日志详情',
      width: '75%',
      // className: styles.large,
      content: wrapHtml(data)
    })
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
          <div>参数：</div>
          <div>
            <JSONView data={data.params} />
          </div>
        </div>
        <div className="row">
          <div>请求头：</div>
          <div>
            <JSONView data={data.headers}/>
          </div>
        </div>
        <div className="row">
          <div>响应头：</div>
          <div>
            <JSONView data={data.resHeaders || data.responseHeaders}/>
          </div>
        </div>
        <div className="row">
          <div>响应参数：</div>
          <div>
            <JSONView data={data.resData}/>
          </div>
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
    if(/^2\d{2}/.test(status)) {
      info = 'success'
    } else if(/^4\d{2}/.test(status)) {
      info = 'warning'
    } else if(/^5\d{2}/.test(status)) {
      info = 'error'
    }
    return info
  }

  return <Spin spinning={loading}>
    <Form
      form={form}
      className="form"
    >
      <h3>Website geographic information</h3>
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
          <Form.Item name="createdAt">
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

export default GeographyLogPage
