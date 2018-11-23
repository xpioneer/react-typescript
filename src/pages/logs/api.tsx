import * as React from 'react'
import {inject, observer} from 'mobx-react'
import { Row, Col, Form, Icon, Input, Button, DatePicker, Table, Modal, Badge } from 'antd';

const FormItem = Form.Item;


@inject('apiLogStore')
@observer
export default class APILog extends React.Component<IProps> {

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
    width: '20%',
  }, {
    title: 'Path',
    dataIndex: 'path',
    // filters: [
    //   { text: 'Male', value: 'male' },
    //   { text: 'Female', value: 'female' },
    // ],
    width: '100px',
  }, {
    title: 'Url',
    dataIndex: 'url',
    width: '120px',
    render: (text: string, record: any, index: number) => <div onClick={() => this.showParamsDetail(record.url, 'url')} className="textflow-4" style={{cursor: 'pointer'}}> {text} </div>,
  }, {
    title: '请求方式',
    dataIndex: 'method',
    width: '60px',
  }, {
    title: '参数',
    dataIndex: 'params',
    render: (text: string, record: any, index: number) => <div onClick={() => this.showParamsDetail(record.params, 'params')} className="textflow-4" style={{cursor: 'pointer'}}> {text} </div>,
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
    width: '80px',
    render: (text: string, record: any, index: number) => <Button type="primary" onClick={() => this.viewDetail(record)}>详情</Button>,
  }]

  // 查看Url/参数详情
  showParamsDetail = (str: any, type?: string) => {
    if(str) {
      this.setState({
        modalTitle: type === 'url' ? 'Url详情' : '参数详情',
        visible: !this.state.visible,
        modalTxt: str
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

  wrapHtml = (data: any) => {
    if(data !== null && Object.keys(data).length > 0) {
      return <React.Fragment>
        <div className="row">
          <p>ID：</p><p>{data.id}</p>
        </div>
        <div className="row">
          <p>IP：</p><p>{data.ip}</p>
        </div>
        <div className="row">
          <p>Url：</p><p>{data.url}</p>
        </div>
        <div className="row">
          <p>Path：</p><p>{data.path}</p>
        </div>
        <div className="row">
          <p>参数：</p><p>{data.params}</p>
        </div>
        <div className="row">
          <p>请求头：</p><p>{data.headers}</p>
        </div>
        <div className="row">
          <p>创建时间：</p><p>{data.createdAt}</p>
        </div>
        <div className="row">
          <p>状态：</p><p>{data.status}</p>
        </div>
        <div className="row">
          <p>耗时：</p><p>{data.time}</p>
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
    this.props.apiLogStore.search()
  }

  render(){
    const { modalTitle, visible, modalTxt, visibleLog, detailInfo } = this.state
    const { value, loading, list, meta, inputChange, search } = this.props.apiLogStore
 
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
              <DatePicker.RangePicker onChange={(e) => inputChange(e, 'createdAt')} />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem>
              <DatePicker.RangePicker/>
            </FormItem>
          </Col>
        </Row>
        <Row className="search-btn-w">
          <Col span={24}>
            <Button onClick={() => {}}>
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