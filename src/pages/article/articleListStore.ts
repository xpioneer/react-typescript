import { observable, action, autorun, runInAction } from 'mobx';
import { serialize } from '@utils/params'
import { Moment } from 'moment'

const queryArticles = `
query articlePages($page: Int, $pageSize: Int, $order: pageOrder, $title: String, $abstract: String, $tag: String, $createdAt: [String]){
  articles(page: $page, pageSize: $pageSize, order: $order, title: $title, abstract: $abstract, tag: $tag, createdAt: $createdAt){
    list{id,title,abstract,createdAt,createdBy}
    meta{current,total,pageSize}
  }
}`

class articleListStore {
  @observable value = {
    title: '',
    abstract: '',
    tag: '',
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
    if(type === 'createdAt') {
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
      title: '',
      abstract: '',
      tag: '',
      createdAt: '',
      page: 1,
      pageSize: 10,
      order: {}
    }
  }

  @action search = (pagination: any = {}, filters: any, orders: any) => {
    this.value['page'] = pagination.current || 1

    if(orders && Object.keys(orders).length > 0) {
      this.value.order[orders.field] = orders.order === 'ascend' ? 'ASC' : 'DESC'
    }
    
    this.fetch(this.value)
  }

  fetch = (data: any) => {
    console.log(data, '----data')
    this.loading = true

    $http.post('/graphql', {
      query: queryArticles,
      variables: serialize.fmtPost(this.value)
    }).then((res: any) => {
      runInAction(() => {
        this.loading = false
        this.list = res.data.articles.list
        this.meta = res.data.articles.meta
      })
    }, err => {
      runInAction(() => {
        this.loading = false
      })
    })
  }

}

export default new articleListStore()