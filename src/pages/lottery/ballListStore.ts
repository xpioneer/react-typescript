import { observable, action, autorun, runInAction } from 'mobx';
import { serialize } from '@utils/params'
import { Moment } from 'moment'
import { GRAPHQL_API } from '@constants/index'

const queryBall = `
query ballPages($page: Int, $pageSize: Int, $order: pageOrder, $issue: issue, $drawDate: [String]){
  balls(page: $page, pageSize: $pageSize, order: $order, issue: $issue, drawDate: $drawDate){
    list{id,issue,red1,red2,red3,red4,red5,red6,blue,prizeOne,prizeOneNum,prizeTwo,prizeTwoNum,drawDate,createdAt}
    meta{current,total,pageSize}
  }
}`

class ballListStore {
  @observable value = {
    issue: '',
    drawDate: '',
    page: 1,
    pageSize: 40,
    order: {}
  }
  @observable loading: boolean = false
  @observable list: [] = []
  @observable meta: object = {}
  @observable drawDate: string = '' // datepicker show value
  
  
  @action inputChange = (value: any, type: string) => {
    if(type === 'drawDate') {
      this.drawDate = value
      const range = value
      this.value[type] = range.map((d: Moment, index: number) => {
        return index > 0 ? d.format('YYYY-MM-DD 23:59:59:999') : d.format('YYYY-MM-DD 00:00:00:000')
      })
    } else {
      this.value[type] = value.trim()
    }
  }

  @action clear = () => {
    this.drawDate = ''
    this.value = {
      issue: '',
      drawDate: '',
      page: 1,
      pageSize: 40,
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
    this.loading = true

    $http.post(GRAPHQL_API, {
      query: queryBall,
      variables: serialize.fmtPost(this.value)
    }).then((res: any) => {
      runInAction(() => {
        this.loading = false
        this.list = res.data.balls.list
        this.meta = res.data.balls.meta
      })
    }, err => {
      runInAction(() => {
        this.loading = false
      })
    })
  }

}

export default new ballListStore()