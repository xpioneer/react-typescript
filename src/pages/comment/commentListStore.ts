import { observable, action, autorun, runInAction } from 'mobx'
import { serialize } from '@utils/params'
import { Moment } from 'moment'
import { GRAPHQL_API } from '@constants/index'

const queryCommentTypes = `
query commentPages($page: Int, $pageSize: Int, $order: pageOrder, $description: String, $createdAt: [String]){
  comments(page: $page, pageSize: $pageSize, order: $order, description: $description, createdAt: $createdAt){
    list{id,description,articleId,ip,createdAt}
    meta{current,total,pageSize}
  }
}`

class commentListStore {
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
      this.value[type] = range.map((d: Moment, index: number) => {
        return index > 0 ? d.format('YYYY-MM-DD 23:59:59:999') : d.format('YYYY-MM-DD 00:00:00:000')
      })
    } else {
      this.value[type] = value.trim()
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
      this.value.order[orders.field] = orders.order === 'ascend' ? 'ASC' : 'DESC'
    }
    
    this.fetch(this.value)
  }

  fetch = (data: any) => {
    this.loading = true

    $http.post(GRAPHQL_API, {
      query: queryCommentTypes,
      variables: serialize.fmtPost(this.value)
    }).then((res: any) => {
      runInAction(() => {
        this.loading = false
        this.list = res.data.comments.list
        this.meta = res.data.comments.meta
      })
    }, err => {
      runInAction(() => {
        this.loading = false
      })
    })
  }

}

export default new commentListStore()