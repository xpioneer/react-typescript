import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Input, Button, Table, Badge, Flex, Space, Spin } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import styles from './style.module.scss'
import { APILog, RequestStatus } from 'types/api'
import { useApi } from './useApi'
import { DatePicker } from 'components/datePicker'
import { JSONView } from 'components/jsonView'
import { modal } from 'components/message'
import { dateFormat } from '@/utils/tools'
import { DateFormat } from '@/types/base'

const APILogPage: React.FC = () => {
  const { form, loading, pageData, onQuery } = useApi()

  const columns: ColumnProps<APILog>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      // render: (name: any) => `${name.first} ${name.last}`,
      width: '12%',
    },
    {
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
      render: (text: string, record, index: number) => (
        <div
          onClick={() => {
            showParamsDetail(record.url, 'Url')
          }}
          className="textflow-4"
        >
          {text}
        </div>
      ),
    },
    {
      title: '请求方式',
      dataIndex: 'method',
      width: '60px',
    },
    {
      title: '参数',
      width: 400,
      dataIndex: 'params',
      render: (text: string, record, index: number) => (
        <div onClick={() => showParamsDetail(record.params, '参数')} className="textflow-4">
          {object2Str(text)}
        </div>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: '60px',
      render: (text: string, record, index: number) => (
        <Badge status={getStatus(text)} text={text} />
      ),
    },
    {
      title: '创建时间',
      width: '120px',
      dataIndex: 'createdAt',
      sorter: true,
      render: (value: string) => dateFormat(value, DateFormat.DateTimeMS),
    },
    {
      title: '耗时(ms)',
      dataIndex: 'time',
      width: '60px',
    },
    {
      title: '操作',
      dataIndex: '',
      width: '60px',
      fixed: 'right',
      render: (text: string, record, index: number) => (
        <Button size="small" type="primary" onClick={() => onViewDetail(record)}>
          详情
        </Button>
      ),
    },
  ]

  const object2Str = (o: string | object): string => {
    return typeof o === 'string' ? o : JSON.stringify(o)
  }

  // 查看Url/参数详情
  const showParamsDetail = (data: any, title: string) => {
    if (typeof data === 'string') {
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
      content: wrapHtml(data),
    })
  }

  const wrapHtml = (data: any) => {
    if (data && Object.keys(data).length > 0) {
      return (
        <React.Fragment>
          <div className="row">
            <div>ID：</div>
            <div>{data.id}</div>
          </div>
          <div className="row">
            <div>IP：</div>
            <div>{data.ip}</div>
          </div>
          <div className="row">
            <div>Url：</div>
            <div>{data.url}</div>
          </div>
          <div className="row">
            <div>Path：</div>
            <div>{data.path}</div>
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
              <JSONView data={data.resHeaders || data.responseHeaders} />
            </div>
          </div>
          <div className="row">
            <div>响应参数：</div>
            <div>
              <JSONView data={data.resData} />
            </div>
          </div>
          <div className="row">
            <div>创建时间：</div>
            <div>{data.createdAt}</div>
          </div>
          <div className="row">
            <div>状态：</div>
            <div>{data.status}</div>
          </div>
          <div className="row">
            <div>耗时：</div>
            <div>{data.time}ms</div>
          </div>
        </React.Fragment>
      )
    } else {
      return ''
    }
  }

  // 获取状态badge
  const getStatus = (status: any): RequestStatus => {
    let info: RequestStatus = 'default'
    if (/^2\d{2}/.test(status)) {
      info = 'success'
    } else if (/^4\d{2}/.test(status)) {
      info = 'warning'
    } else if (/^5\d{2}/.test(status)) {
      info = 'error'
    }
    return info
  }

  return (
    <Spin spinning={loading}>
      <Form form={form} className="form">
        <h3>API请求日志</h3>
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
            <Form.Item name="createdAt">
              <DatePicker.RangePicker />
            </Form.Item>
          </Col>
        </Row>
        <Flex className="mgb16" justify={'end'}>
          <Space>
            <Button onClick={() => form.resetFields()}>清空</Button>
            <Button type="primary" onClick={() => onQuery()}>
              搜索
            </Button>
          </Space>
        </Flex>
      </Form>
      <Table
        size="small"
        scroll={{ x: 1600 }}
        columns={columns}
        rowKey={(record: any) => record.id}
        dataSource={pageData.data}
        pagination={pageData.meta}
        onChange={({ current, pageSize }) => onQuery(current, pageSize)}
      />
    </Spin>
  )
}

export default APILogPage
