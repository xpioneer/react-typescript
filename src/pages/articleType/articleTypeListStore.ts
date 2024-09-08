import { observable, action, autorun, runInAction } from 'mobx'
import { serialize } from '@utils/params'
import { startOfDay, endOfDay } from 'date-fns'
import { GRAPHQL_API } from '@constants/index'

const queryArticleTypes = `
query articleTypePages($page: Int, $pageSize: Int, $order: pageOrder, $name: String, $createdAt: [String]){
  articleTypes(page: $page, pageSize: $pageSize, order: $order, name: $name, createdAt: $createdAt){
    list{id,name,remark,createdAt,createdBy}
    meta{current,total,pageSize}
  }
}`

class articleTypeListStore {
  @observable value = {
    name: '',
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
      name: '',
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
    // console.log(data, '----data')
    this.loading = true

    $http.post(GRAPHQL_API, {
      query: queryArticleTypes,
      variables: serialize.fmtPost(this.value)
    }).then((res: any) => {
      runInAction(() => {
        this.loading = false
        this.list = res.data.articleTypes.list
        this.meta = res.data.articleTypes.meta
      })
    }, err => {
      runInAction(() => {
        this.loading = false
      })
    })
  }

}

export default new articleTypeListStore()