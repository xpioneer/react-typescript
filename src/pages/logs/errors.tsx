import * as React from 'react'
import {inject, observer} from 'mobx-react'
import { Row, Col, Form, Icon, Input, Button, DatePicker, Table, Modal, Badge } from 'antd';
import { object2Str } from '@utils/tools'

const FormItem = Form.Item;


@inject('errorLogStore')
@observer
export default class ErrorsLog extends React.Component<IProps> {

  state = {
    modalTitle: '参数详情',
    visible: false,
    modalTxt: '',
    visibleLog: false,
    detailInfo: {}
  }

  columns = [{
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
    render: (text: string, record: any, index: number) => <div onClick={() => this.showParamsDetail(record, 'url')} className="textflow-4"> {text} </div>,
  }, {
    title: '请求方式',
    dataIndex: 'method',
    width: '60px',
  }, {
    title: '参数',
    dataIndex: 'params',
    render: (text: string, record: any, index: number) => <div onClick={() => this.showParamsDetail(record, 'params')} className="textflow-4"> {object2Str(text)} </div>,
  }, {
    title: '错误信息',
    dataIndex: 'msg',
    render: (text: string, record: any, index: number) => <div onClick={() => this.showParamsDetail(record, 'msg')} className="textflow-4"> {text} </div>,
  }, {
    title: '状态',
    dataIndex: 'status',
    width: '60px',
    render: (text: string, record: any, index: number) => <Badge status={this.getStatus(text)} text={text}/>,
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
    render: (text: string, record: any, index: number) => <Button size="small" type="primary" onClick={() => this.viewDetail(record)}>详情</Button>,
  }]

  // 查看Url/参数详情
  showParamsDetail = (record: any, type?: string) => {
    if(record) {
      let str = record.url, title = 'Url'
      if(type === 'params') {
        title = 'Params'
        str = record.params
      }
      if(type === 'msg') {
        title = '错误'
        str = this.errorStack(record.errors)
      }
      this.setState({
        modalTitle: title + '详情',
        visible: !this.state.visible,
        modalTxt: object2Str(str)
      })
    } else {
      this.setState({ visible: false })
    }
    
  }

  // 查看日志详情
  viewDetail = (data: any) => {
    if(data) {
      this.setState({
        visibleLog: true,
        detailInfo: data
      })
    } else {
      this.setState({
        visibleLog: false,
      })
    }
    
  }

  // 错误堆栈信息
  errorStack = (errs: [string|{[key: string]: any}]) => {
    return <React.Fragment>
      {
        typeof(errs[0]) === 'string' ?errs.map((e, index) => {
          const r = e.match(/^\s*[^\w]/)
          const paddingLeft = r ? r[0].length * 8 : 0
          return <div style={{paddingLeft, color: 'red'}} key={index}>{e}</div>
        }) : errs.map((obj: {[key: string]: any}, index) => {
          const keys = Object.keys(obj).map((key, i) => {
            return <div key={i}>{key}：{typeof(obj[key]) === 'object' ? JSON.stringify(obj[key]) : obj[key]}</div>
          })
          return <div style={{color: 'red'}} key={index}>{keys}</div>
        })
      }
    </React.Fragment>
  }

  formatHeader = (data: any) => {
    const type = typeof(data)
    if(type === 'string') {
      const headerObj = JSON.parse(data)
      return Object.keys(headerObj).map(h => {
        return <div key={h}>{h} : {headerObj[h]}</div>
      })
    } else if(type === 'object') {
      return Object.keys(data).map(h => {
        return <div key={h}>{h} : {data[h]}</div>
      })
    } else {
      return ''
    }
  }

  // 日志详情页面
  wrapHtml = (data: any) => {
    if(data !== null && Object.keys(data).length > 0) {
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
          <div>堆栈信息：</div><div>{this.errorStack(data.errors)}</div>
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
          <div>请求头：</div><div>{this.formatHeader(data.headers)}</div>
        </div>
        <div className="row">
          <div>响应头：</div><div>{this.formatHeader(data.responseHeaders)}</div>
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
  getStatus = (status: any): "default"|"success"|"warning"|"error" => {
    let info: "default"|"success"|"warning"|"error" = "default";
    switch (status) {
      case 200:
      case 201:
        info = 'success';
        break;
      case 400:
      case 401:
      case 403:
      case 404:
      case 405:
      case 406:
        info = 'warning';
        break;
      case 500:
      case 501:
      case 502:
      case 503:
      case 504:
      case 505:
        info = 'error';
        break;

      default:
        info = 'default';
        break;
    }
    return info;
  }
  
  componentDidMount() {
    this.props.errorLogStore.search()
  }

  render(){
    const { modalTitle, visible, modalTxt, visibleLog, detailInfo } = this.state
    const { value, loading, list, meta, inputChange, search, clear } = this.props.errorLogStore
 
    return <React.Fragment>
      <Modal
        title={modalTitle}
        keyboard={true}
        visible={visible}
        onOk={() => this.showParamsDetail('')}
        onCancel={() => this.showParamsDetail('')}
      > {modalTxt} </Modal>
      <Modal
        className="large-modal"
        title="日志详情"
        style={{ top: 40 }}
        keyboard={true}
        visible={visibleLog}
        onOk={() => this.viewDetail('')}
        onCancel={() => this.viewDetail('')}
      > {this.wrapHtml(detailInfo)} </Modal>
      <Form className="search-form">
        <h3>错误日志</h3>
        <Row gutter={24}>
          <Col span={6}>
            <FormItem>
              <Input placeholder="path" onChange={e => inputChange(e.target.value, 'path')} value={value.path}/>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem>
              <Input placeholder="url" onChange={e => inputChange(e.target.value, 'url')} value={value.url}/>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem>
              <Input placeholder="错误信息" onChange={e => inputChange(e.target.value, 'msg')} value={value.msg}/>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem>
              <DatePicker.RangePicker onChange={(e) => inputChange(e, 'createdAt')} />
            </FormItem>
          </Col>
        </Row>
        <Row className="search-btn-w">
          <Col span={24}>
            <Button onClick={clear}>
              清空
            </Button>
            <Button type="primary" onClick={search}>
              搜索
            </Button>
          </Col>
        </Row>
      </Form>
      <Table
        bordered
        className="table-list"
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