import { observable, action, autorun, runInAction } from 'mobx';
import { serialize } from '@utils/params'
import { Moment } from 'moment'

class apiLogStore {
  @observable value = {
    path: '',
    url: '',
    createdAt: '',
    page: 1,
    pageSize: 10
  }
  @observable loading: boolean = false
  @observable list: [] = []
  @observable meta: object = {}
  @observable createdAt: string = ''
  
  
  @action inputChange = (value: any, type: string) => {
    if(type === 'createdAt') {
      const range: [Moment, Moment] = value
      this.value[type] = range.map((d: Moment, index) => {
        return index > 0 ? d.format('YYYY/MM/DD 23:59:59:999') : d.format('YYYY/MM/DD 00:00:00:000')
      }).join(',')
    } else {
      this.value[type] = value.trim()
    }
  }

  @action clear = () => {
    this.value = {
      path: '',
      url: '',
      createdAt: '',
      page: 1,
      pageSize: 10
    }
  }

  @action search = (data: any = {}) => {
    this.value['page'] = data.current || 1
    this.loading = true

    $http.get('/api/log-api?' + serialize.fmtGet(this.value)).then((res: any) => {
      runInAction(() => {
        this.loading = false
        this.list = res.data
        this.meta = res.meta
      })
    }, err => {
      runInAction(() => {
        this.loading = false
      })
      // message.error(err.msg)
      // console.log(err)
    })
  }

}

export default new apiLogStore()