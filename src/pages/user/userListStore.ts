import { observable, action, autorun, runInAction } from 'mobx'
import { serialize } from '@utils/params'
import { Moment } from 'moment'
import { GRAPHQL_API } from '@constants/index'

const queryUsers = `
query userPages($page: Int, $pageSize: Int, $order: pageOrder, $nickName: String, $username: String, $userType: Int, $createdAt: [String]){
  users(page: $page, pageSize: $pageSize, order: $order, nickName: $nickName, username: $username, userType: $userType, createdAt: $createdAt){
    list{id,nickName,username,userType,remark,createdAt}
    meta{current,total,pageSize}
  }
}`

class userListStore {
  @observable value = {
    nickName: '',
    username: '',
    userType: '',
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
      this.value[type] = range.map((d: Moment, index: number) => {
        return index > 0 ? d.format('YYYY-MM-DD 23:59:59:999') : d.format('YYYY-MM-DD 00:00:00:000')
      })
    } else {
      this.value[type] = typeof(value) === 'number' ? value : value.trim()
    }
  }

  @action clear = () => {
    this.createdAt = ''
    this.value = {
      nickName: '',
      username: '',
      userType: '',
      createdAt: '',
      page: 1,
      pageSize: 10,
      order: {}
    }
  }

  @action search = (pagination: any = {}, filters: any, orders: any) => {
    this.value['page'] = pagination.current || 1

    if (orders && Object.keys(orders).length > 0) {
      this.value.order[orders.field] = orders.order === 'ascend' ? 'ASC' : 'DESC'
    }
    
    this.fetch(this.value)
  }

  fetch = (data: any) => {
    this.loading = true

    $http.post(GRAPHQL_API, {
      query: queryUsers,
      variables: serialize.fmtPost(this.value)
    }).then((res: any) => {
      runInAction(() => {
        this.loading = false
        this.list = res.data.users.list
        this.meta = res.data.users.meta
      })
    }, err => {
      runInAction(() => {
        this.loading = false
      })
    })
  }

}

export default new userListStore()