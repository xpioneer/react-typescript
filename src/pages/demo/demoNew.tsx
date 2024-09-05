import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Badge, Form, Input, Select, Space, Upload, UploadFile, Flex } from 'antd'
import { MinusCircleOutlined, PlusCircleOutlined, PlusCircleFilled, PlusOutlined } from '@ant-design/icons'
import { useDemoState } from './useDemo'
import { apiTypeOpts, methodOpts, APIFormTest, Method, APIType } from 'types/demo'
import { JSONView } from '@/components/jsonView'
import styles from './demo.module.scss'
import { DatePicker } from 'components/datePicker'
import { TestComponent, TestComponent2 } from './components/test'

const TextArea = Input.TextArea

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
}

interface FileForm {
  files: UploadFile[]
}

const Demo: React.FC<ICommonProps> = () => {

  const [count, setCount] = useState(8)
  
  const {
    form,
    apiType,
    fileForm,
    response,
    onRequest,
  } = useDemoState()

  useEffect (() => {
    // 
  }, [])

  const onTest = () => {
    const data = form.getFieldsValue()
    console.log('onTest:', data)
  }

  const onFinish = (values: APIFormTest) => {
    console.log('submit:', values)
    onRequest(values)
  }

  const onFileFinish = (values: FileForm) => {
    // 
  }

  return <div>
    <section className={styles.block}>
      <Space size='large'>
        <TestComponent/>
        <TestComponent2/>
      </Space>
    </section>
    <section className={styles.block}>
      <h3>mini测试</h3>
      <Space>
        <Button onClick={() => setCount(x => --x)}>
          <MinusCircleOutlined />
        </Button>
        <Badge count={count} showZero={true} />
        <Button onClick={() => setCount(x => ++x)}>
          <PlusCircleOutlined />
        </Button>
        <DatePicker />
      </Space>
    </section>
    
    <section className={styles.block}>
      <h3>接口测试</h3>
      <Form
        style={{width: '100%'}}
        {...formItemLayout}
        form={form}
        initialValues={{
          method: Method.GET,
          apiType: APIType.RESTful
        }}
        onFinish={onFinish}
      >
        <Form.Item wrapperCol={{offset: 4}}>
          <Space>
            <Button htmlType='submit' type="primary">发送</Button>
            <Button onClick={onTest}>保存测试</Button>
          </Space>
        </Form.Item>
        <Form.Item label="API路径" required>
          <Row gutter={16}>
            <Col span={14}>
              <Form.Item noStyle name='url' rules={[{required: true}]}>
                <Input placeholder="请输入url" disabled={apiType === APIType.Graphql}/>
              </Form.Item>
            </Col>
            <Col span={5}>
              {apiType === APIType.RESTful && <Form.Item noStyle name='method'>
                <Select options={methodOpts}/>
              </Form.Item>}
            </Col>
            <Col span={5}>
              <Form.Item noStyle name="apiType">
                <Select options={apiTypeOpts}/>
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item name="params" label="参数(标准json格式)" tooltip="https://www.json.org/json-en.html">
          <TextArea rows={6}/>
        </Form.Item>
        <Form.Item label="结果" wrapperCol={{span: 18}} className={styles.jsonView}>
          <JSONView data={response} />
        </Form.Item>
      </Form>
    </section>

    <section className={styles.block}>
      <h3>文件上传</h3>
      <Form
        form={fileForm}
        onFinish={onFileFinish}
      >
        <Form.Item name="files" label="选择文件" labelCol={{span: 4}} wrapperCol={{span: 20}} rules={[{required: true}]}>
          <Upload>
            <Button icon={<PlusOutlined/>}>上传文件</Button>
          </Upload>
        </Form.Item>

        <Form.Item wrapperCol={{offset: 4}}>
          <Space>
            <Button htmlType='submit' type="primary">上传</Button>
            <Button onClick={() => fileForm.resetFields()}>清空</Button>
          </Space>
        </Form.Item>
      </Form>
    </section>
    
  </div>
}

export default Demo