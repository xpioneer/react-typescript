import { observable, action, autorun, runInAction } from 'mobx';
import { message } from 'antd'

interface IParamsData {
  [key: string]: any
}

class DemoStore {
  @observable count: number = 90
  @observable apiUrl = ''
  @observable apiType = '/api'
  @observable apiMethod = 'GET'
  @observable apiParams = ''
  @observable apiResult = ''

  @action add = () => {
    return ++this.count
  }
  @action desc = () => {
    if(this.count <= 0){
      return 0
    }
    return --this.count
  }

  @action inputApi = (value: string) => {
    this.apiUrl = value
  }

  @action typeChange = (type: string) => {
    this.apiType = type
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
      jsonData = JSON.parse(this.apiParams)
    } catch(e) {
      error = e
    }
    if(error) {
      message.error('参数请使用json格式')
      return
    }
    // if(this.apiType === '/api')
    $http.post(this.apiType + this.apiUrl).then(res => {
      console.log(res)
    })
  }

}

export default new DemoStore()