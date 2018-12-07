import { observable, action, autorun, runInAction } from 'mobx';
import { message } from 'antd'
import { serialize } from '@utils/params'
import { Moment } from 'moment'

const queryArticles = `query articlePages($page: Int, $pageSize: Int, $order: pageOrder, $title: String){
  articles(page: $page, pageSize: $pageSize, order: $order, title: $title){
    list{id,title,abstract,createdAt,createdBy}
    meta{current,total,pageSize}
  }
}`

class articleListStore {
  @observable value = {
    title: '',
    abstract: '',
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
      title: '',
      abstract: '',
      createdAt: '',
      page: 1,
      pageSize: 10,
      order: {}
    }
  }

  @action search = (pagination: any = {}, filters: any, orders: any) => {
    console.log(pagination, '----pagination')
    console.log(pagination, filters, orders)
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
      // message.error(err.msg)
      console.log(err)
    })
  }

}

export default new articleListStore()