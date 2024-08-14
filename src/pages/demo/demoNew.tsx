import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Badge, Form, Input, Select, DatePicker, Space, Upload, UploadFile } from 'antd'
import { MinusCircleOutlined, PlusCircleOutlined, PlusCircleFilled, PlusOutlined } from '@ant-design/icons'
import { useDemoState } from './useDemo'
import { apiTypeOpts, methodOpts, APIFormTest, Method, APIType } from 'types/demo'

const TextArea = Input.TextArea

const styles: Record<string, React.CSSProperties> = {
  block: {
    marginBottom: '20px',
    boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 8px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
    padding: '10px',
    borderRadius: 6
  },
  flex: {
    display: 'flex',
    alignItems: 'center'
  },
  padding: {
    padding: '10px 0'
  }
}

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

  const [form] = Form.useForm<APIFormTest>()
  const [fileForm] = Form.useForm<FileForm>()

  const apiType = Form.useWatch('apiType', form) as APIType

  const [count, setCount] = useState(8)
  
  const {
    onRequest,
    response,
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
    <section style={styles.block}>
      <h3>mini测试</h3>
      <Space>
        <Badge count={count} showZero={true} />
        <Button onClick={() => setCount(x => --x)}>
          <MinusCircleOutlined />
        </Button>
        <Button onClick={() => setCount(x => ++x)}>
          <PlusCircleOutlined />
        </Button>
        <DatePicker />
      </Space>
    </section>
    
    <section style={styles.block}>
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
        <Form.Item name='url' label="API路径" rules={[{required: true}]}>
          <Input placeholder="请输入url"/>
        </Form.Item>
        {
          apiType === APIType.RESTful ?
            <Form.Item label="Method" name='method' wrapperCol={{span: 4}}>
              <Select options={methodOpts}/>
            </Form.Item> : null
        }
        <Form.Item name="apiType" label="API类型" wrapperCol={{span: 4}}>
          <Select options={apiTypeOpts}/>
        </Form.Item>
        <Form.Item label="参数(json格式)" name="params">
          <TextArea rows={6}/>
        </Form.Item>
        <Form.Item label="结果" wrapperCol={{span: 18}}>
          <TextArea rows={24} value={response}/>
        </Form.Item>
      </Form>
    </section>

    <section style={styles.block}>
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