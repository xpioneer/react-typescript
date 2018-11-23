import { observable, action, autorun, runInAction } from 'mobx';
import { message } from 'antd'
import { serialize } from '@utils/params'
import * as moment from 'moment'
import {Moment} from 'moment'

class apiLogStore {
  @observable loading: boolean = false
  @observable list: [] = []
  @observable meta: object = {}
  @observable createdAt: string = ''
  
  
  @action dateChange = (range: [Moment, Moment]) => {
    this.createdAt = range.map((d: Moment, index) => {
      return index > 0 ? d.format('YYYY/MM/DD 23:59:59:999') : d.format('YYYY/MM/DD 00:00:00:000')
    }).join(',')
  }

  @action search = (data: any = {}) => {
    console.log(data, '-----data')
    let params = {
      'createdAt': this.createdAt,
      'path':  '',
      'page': data.current,
      'pageSize': data.pageSize
    }
    this.loading = true

    $http.get('/api/log-api?' + serialize.fmtGet(params)).then((res: any) => {
      runInAction(() => {
        this.loading = false
        this.list = res.data
        this.meta = res.meta
      })
    }, err => {
      runInAction(() => {
        this.loading = false
      })
      message.error(err.msg)
      console.log(err)
    })
  }

}

export default new apiLogStore()