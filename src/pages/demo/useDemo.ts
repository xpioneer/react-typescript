import React, { useState, useEffect, useCallback } from 'react'
import { Form, message, UploadFile } from 'antd'
import { APIFormTest, APIType, Method } from 'types/demo'

const defaultParams: AnyObject = {
  query: '{}',
  varibles: '{}',
  operationName: null
}


export const useDemoState = () => {
  const [form] = Form.useForm<APIFormTest>()
  const [fileForm] = Form.useForm<{files: UploadFile[]}>()

  const [response, setResponse] = useState({})

  // listener 'apiType'
  const apiType = Form.useWatch('apiType', form)
  
  useEffect(() => {
    console.log('watch type', apiType)
    if(apiType === APIType.Graphql) {
      form.setFieldsValue({
        url: apiType,
        params: JSON.stringify(defaultParams, null, 4)
      })
    } else {
      form.setFieldsValue({
        url: '/api',
        params: JSON.stringify({
          testField: 'this is testField value',
          age: 123,
          paid: true
        }, null, 4)
      })
    }
  }, [apiType])

  const onRequest = useCallback((data: APIFormTest) => {
    const { url, method, params } = data
    let jsonData = {}, error = null
    try {
      if (params) {
        jsonData = JSON.parse(params)
      }
    } catch (e) {
      error = e
    }
    if (error) {
      message.error('参数请使用标准json格式')
      return
    }
    $http({
      url,
      method,
      data: method === Method.GET ? null : jsonData,
      params: method === Method.GET ? jsonData : null
    }).then(res => {
      setResponse(res)
    }, e => {
      setResponse(e)
    })
  }, [])

  const upload = useCallback((file: File) => {
    const fd = new FormData()
    fd.append('file', file)

    $http.post('/api/upload', fd).then(res => {
      console.log(res)
    }, err => {
      console.log(err, 'err')
    })
  }, [])


  return {
    form,
    apiType,
    fileForm,
    response,
    onRequest,
    upload
  }
}
