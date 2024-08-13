import React, { useState, useEffect, useCallback } from 'react'
import { observable, action, autorun, runInAction } from 'mobx'
import { message } from 'antd'

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
  const [count, setCount] = useState(90)
  const [apiUrl, setApiUrl] = useState( '/api')
  const [apiType, setApiType] = useState( '/api')
  const [apiMethod, setApiMethod] = useState( 'GET')
  const [apiParams, setApiParams] = useState( '')
  const [apiResult, setApiResult] = useState( '')
  const [fileVal, setFileVal] = useState()

  const add = useCallback(() => {
    setCount(x => ++x) 
  }, [])
  const desc = useCallback(() => {
    setCount(x => --x) 
  }, [])

  const inputApi = useCallback((value: string) => {
    setApiUrl(value)
  }, [])

  const typeChange = useCallback((type: string) => {
    setApiType(type)
    if (type === '/graphql') {
      setApiParams(JSON.stringify(defaultParams, null, '    '))
    } else {
      setApiParams('')
    }
  }, [])

  const methodChange = useCallback((type: string) => {
    setApiMethod(type)
  }, [])

  const inputParams = useCallback((value: string) => {
    setApiParams(value)
  }, [])

  const testApi = useCallback(() => {
    let jsonData = {}, error = null
    try {
      if (apiParams) {
        jsonData = JSON.parse(apiParams)
      }
    } catch (e) {
      error = e
    }
    if (error) {
      message.error('参数请使用json格式')
      return
    }
    if (apiType === '/api') {
      if (apiMethod === 'GET') {
        $http.get(apiUrl + fmtGetParams(jsonData)).then(res => {
          setApiResult(JSON.stringify(res, null, '    '))
        })
      } else if (apiMethod === 'POST') {
        $http.post(apiUrl, jsonData).then(res => {
          setApiResult(JSON.stringify(res, null, '    '))
        })
      } else if (apiMethod === 'PUT') {
        $http.post(apiUrl, jsonData).then(res => {
          setApiResult(JSON.stringify(res, null, '    '))
        })
      } else if (apiMethod === 'DELETE') {
        $http.post(apiUrl, jsonData).then(res => {
          setApiResult(JSON.stringify(res, null, '    '))
        })
      }
      
    } else {
      $http.post(apiUrl, jsonData).then(res => {
        setApiResult(JSON.stringify(res, null, '    '))
      }, err => {
        setApiResult(JSON.stringify(err.data, null, '    '))
      })
    }
  }, [])

  const fileChange = useCallback((e: any) => {
    if (e && e.target.files) {
      setFileVal(e.target.files[0])
    } else {
      setFileVal(undefined)
    }
  }, [])

  const upload = useCallback(() => {
    console.log(fileVal)
    if (!fileVal) {
      $msg.warn('请选择文件')
      return
    }
    const fd = new FormData()
    fd.append('file', fileVal)

    $http.post('/api/upload', fd).then(res => {
      console.log(res)
    }, err => {
      console.log(err, 'err')
    })
  }, [fileVal])


  return {
    count,
    add,
    desc,
    inputApi,
    methodChange,
    typeChange,
    inputParams,
    testApi,
    apiUrl,
    apiType,
    apiMethod,
    apiParams,
    apiResult,
    fileVal,
    fileChange, upload
  }
}
