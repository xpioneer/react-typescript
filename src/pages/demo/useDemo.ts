import React, { useState, useEffect, useCallback } from 'react'
import { message, UploadFile } from 'antd'
import { APIFormTest } from 'types/demo'

interface IParamsData {
  [key: string]: any
}

const fmtGetParams = (params: object) => {
  let data = ''
  for (let k in params) {
    data += k + '=' + params[k] + '&'
  }
  data = data.substring(0, data.length - 1)
  return data
}

const defaultParams: IParamsData = {
  query: '{}',
  varibles: '{}',
  operationName: null
}


export const useDemoState = () => {
  const [response, setResponse] = useState( '')

  const typeChange = useCallback((type: string) => {
    // setApiType(type)
    if (type === '/graphql') {
      // setApiParams(JSON.stringify(defaultParams, null, '    '))
    } else {
      // setApiParams('')
    }
  }, [])

  const onRequest = useCallback((data: APIFormTest) => {
    const { url, method, apiType, params } = data
    let jsonData = {}, error = null
    try {
      if (params) {
        jsonData = JSON.parse(params)
      }
    } catch (e) {
      error = e
    }
    if (error) {
      message.error('参数请使用json格式')
      return
    }
    if (apiType === '/api') {
      if (method === 'GET') {
        $http.get(url + fmtGetParams(jsonData)).then(res => {
          setResponse(JSON.stringify(res, null, '    '))
        })
      } else {
        $http[method](url, jsonData).then((res: any) => {
          setResponse(JSON.stringify(res, null, '    '))
        })
      } 
    } else {
      $http.post(url, jsonData).then(res => {
        setResponse(JSON.stringify(res, null, '    '))
      }, err => {
        setResponse(JSON.stringify(err.data, null, '    '))
      })
    }
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
    typeChange,
    onRequest,
    response,
    upload
  }
}
