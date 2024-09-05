import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Row, Col, Form, Input, Button,
  Spin,
  FormItemProps,
  Space,
  Select,
  Checkbox,
} from 'antd'
import { useDetail } from './useDetail'
import { IArticle } from 'models/article'
import { QuillEditor } from 'components/editor/new'
import { DatePicker } from 'components/datePicker'

const formLayout: FormItemProps = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16
  }
}

const ArticleDetailPage: React.FC = () => {

  const {
    form,
    optsRef,
    isEdit,
    loading,
    onSave,
  } = useDetail()

  const navigate = useNavigate<{id: string}>()

  const { types, tags } = optsRef.current

  const onFinish = (vals: IArticle) => {
    onSave(vals).then(history.goBack)
  }

  return <Spin spinning={loading}>
    <h3>文章详情</h3>
    <Form
      form={form}
      {...formLayout}
      className="form"
      onFinish={onFinish}
    >
      <Form.Item hidden name="id"/>
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item label="标题" name="title" rules={[{required: true, message: '请输入标题'}]}>
            <Input placeholder="标题"/>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="摘要" name="abstract" rules={[{required: true, message: '请输入摘要'}]}>
            <Input.TextArea rows={4} placeholder="摘要"/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="文章类型" name="typeId" labelCol={{span: 8}} wrapperCol={{span: 16}} rules={[{required: true, message: '请选择文章类型'}]}>
            <Select options={types.map(item => ({
              label: item.name,
              value: item.id
            }))} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="是否置顶" name="isTop" labelCol={{span: 4}} wrapperCol={{span: 4}} rules={[{required: true, message: '请选择是否置顶'}]}>
            <Select>
              <Select.Option value={1}>是</Select.Option>
              <Select.Option value={0}>否</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="内容" name="description" rules={[{required: true, message: '请输入内容'}]}>
            <QuillEditor />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="标签" name="tag">
            <Checkbox.Group options={tags.map((item, idx) => ({
              label: item.name,
              value: item.id
            }))} />
          </Form.Item>
        </Col>
        {
          isEdit && <Col span={24}>
            <Form.Item label="创建时间" name="createdAt">
              <DatePicker disabled />
            </Form.Item>
          </Col>
        }
      </Row>
      <Col span={24} offset={4}>
        <Space>
          <Button htmlType='submit' type="primary">保存</Button>
          <Button onClick={history.goBack}>取消</Button>
        </Space>
      </Col>
    </Form>
  </Spin>
}

export default ArticleDetailPage