import { observable, action, autorun, runInAction } from 'mobx'
import { serialize } from '@utils/params'
import { startOfDay, endOfDay } from 'date-fns'
import { GRAPHQL_API } from '@constants/index'

const queryLeaveMsg = `
query leaveMsgPages($page: Int, $pageSize: Int, $order: pageOrder, $description: String, $createdAt: [String]){
  leaveMsgs(page: $page, pageSize: $pageSize, order: $order, description: $description, createdAt: $createdAt){
    list{id,description,ip,createdAt}
    meta{current,total,pageSize}
  }
}`

class leaveMsgListStore {
  @observable value = {
    description: '',
    createdAt: '',
    page: 1,
    pageSize: 10,
    order: {}
  }
  @observable loading: boolean = false
  @observable list: [] = []
  @observable meta: object = {}
  @observable createdAt: string = '' // datepicker show value
  
  
  @action inputChange = (value: any, type: string) => {
    if (type === 'createdAt') {
      this.createdAt = value
      const range = value
      this.value[type] = range.map((d: Date, index: number) => {
        return index > 0 ? endOfDay(d) : startOfDay(d)
      })
    } else {
      (this.value as any)[type] = value.trim()
    }
  }

  @action clear = () => {
    this.createdAt = ''
    this.value = {
      description: '',
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

    $http.post(GRAPHQL_API, {
      query: queryLeaveMsg,
      variables: serialize.fmtPost(this.value)
    }).then((res: any) => {
      runInAction(() => {
        this.loading = false
        this.list = res.data.leaveMsgs.list
        this.meta = res.data.leaveMsgs.meta
      })
    }, err => {
      runInAction(() => {
        this.loading = false
      })
    })
  }

}

export default new leaveMsgListStore()