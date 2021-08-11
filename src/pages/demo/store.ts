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

class DemoStore {
  @observable count: number = 90
  @observable apiUrl = '/api'
  @observable apiType = '/api'
  @observable apiMethod = 'GET'
  @observable apiParams = ''
  @observable apiResult = ''
  @observable fileVal: any

  @action add = () => {
    return ++this.count
  }
  @action desc = () => {
    if (this.count <= 0) {
      return 0
    }
    return --this.count
  }

  @action inputApi = (value: string) => {
    this.apiUrl = value
  }

  @action typeChange = (type: string) => {
    this.apiType = type
    this.apiUrl = type
    if (this.apiType === '/graphql') {
      this.apiParams = JSON.stringify(defaultParams, null, '    ')
    } else {
      this.apiParams = ''
    }
  }

  @action methodChange = (type: string) => {
    this.apiMethod = type
  }

  @action inputParams = (value: string) => {
    this.apiParams = value
  }

  @action testApi = () => {
    let jsonData = {}, error = null
    try {
      if (this.apiParams) {
        jsonData = JSON.parse(this.apiParams)
      }
    } catch (e) {
      error = e
    }
    if (error) {
      message.error('参数请使用json格式')
      return
    }
    if (this.apiType === '/api') {
      if (this.apiMethod === 'GET') {
        $http.get(this.apiUrl + fmtGetParams(jsonData)).then(res => {
          runInAction(() => this.apiResult = JSON.stringify(res, null, '    '))
        })
      } else if (this.apiMethod === 'POST') {
        $http.post(this.apiUrl, jsonData).then(res => {
          runInAction(() => this.apiResult = JSON.stringify(res, null, '    '))
        })
      } else if (this.apiMethod === 'PUT') {
        $http.post(this.apiUrl, jsonData).then(res => {
          runInAction(() => this.apiResult = JSON.stringify(res, null, '    '))
        })
      } else if (this.apiMethod === 'DELETE') {
        $http.post(this.apiUrl, jsonData).then(res => {
          runInAction(() => this.apiResult = JSON.stringify(res, null, '    '))
        })
      }
      
    } else {
      $http.post(this.apiUrl, jsonData).then(res => {
        runInAction(() => this.apiResult = JSON.stringify(res, null, '    '))
      }, err => {
        runInAction(() => this.apiResult = JSON.stringify(err.data, null, '    '))
      })
    }
  }

  @action fileChange = (e: any) => {
    if (e && e.target.files) {
      this.fileVal = e.target.files[0]
    } else {
      this.fileVal = undefined
    }
  }

  @action upload = () => {
    console.log(this.fileVal)
    if (!this.fileVal) {
      $msg.warn('请选择文件')
      return
    }
    const fd = new FormData()
    fd.append('file', this.fileVal)

    $http.post('/api/upload', fd).then(res => {
      console.log(res)
    }, err => {
      console.log(err, 'err')
    })
  }

}

export default new DemoStore()