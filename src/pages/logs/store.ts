import { observable, action, autorun, runInAction } from 'mobx'
import { serialize } from '@utils/params'
import { startOfDay, endOfDay } from 'date-fns'

class apiLogStore {
  @observable value = {
    path: '',
    url: '',
    createdAt: '',
    page: 1,
    pageSize: 10,
    order: {}
  }
  @observable loading: boolean = false
  @observable list: [] = []
  @observable meta: object = {}
  @observable createdAt: string = ''
  
  
  @action inputChange = (value: any, type: string) => {
    if (type === 'createdAt') {
      const range: [Date, Date] = value
      this.value[type] = range.map((d, index) => {
        return index > 0 ? endOfDay(d) : startOfDay(d)
      }).join(',')
    } else {
      (this.value as any)[type] = value.trim()
    }
  }

  @action clear = () => {
    this.createdAt = ''
    this.value = {
      path: '',
      url: '',
      createdAt: '',
      page: 1,
      pageSize: 10,
      order: {}
    }
  }

  @action search = (pagination: any = {}, filters: any, orders: any) => {
    this.value['page'] = pagination.current || 1

    if (orders && Object.keys(orders).length > 0) {
      (this.value as any).order[orders.field] = orders.order === 'ascend' ? 'ASC' : 'DESC'
    }
    
    this.fetch(this.value)
  }

  fetch = (data: any) => {
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