import { observable, action, autorun, runInAction, computed } from 'mobx';
import { GRAPHQL_API } from '@constants/index'

const getInitQuery = `{
  articleTypes(page: 1, pageSize: 99){
    list{id,name}
  }
  tags(page: 1, pageSize: 99){
    list{id,name}
  }
}`
const postArticle = `
mutation createArticle($input: articleInput!){
  article(input: $input){id}
}`

class articleCreateStore {
  @observable loading: boolean = false
  @observable mainData: any = {} // article detail data
  @observable typeList: any[] = [] // all article type list
  @observable tagList: any[] = [] // all tag list
  

  @action getInitData = (id: string) => {
    this.loading = true

    $http.post(GRAPHQL_API, {
      query: getInitQuery,
      variables: {id}
    }).then((res: any) => {
      const {articleTypes, tags } = res.data
      const typeList = articleTypes ? articleTypes.list : []
      const tagList = tags ? tags.list : []

      runInAction(() => {
        this.loading = false
        this.typeList = typeList
        this.tagList = tagList.map((t: any) => ({label: t.name, value: t.name}))
      })
    }, err => {
      runInAction(() => {
        this.loading = false
      })
    })
  }

  @action save = (cb: Function) => {
    this.loading = true

    $http.post(GRAPHQL_API, {
      query: postArticle,
      variables: {input: this.mainData}
    }).then((res: any) => {
      const {article:{id}} = res.data
      cb(id)
      runInAction(() => {
        this.loading = false
      })
    }, err => {
      runInAction(() => {
        this.loading = false
      })
    })
  }

  @action inputChange = (value: string | number, type: string) => {
    this.mainData[type] = value
  }

  @action tagChange = (value: string[]) => {
    this.mainData['tag'] = value.join(',')
  }

}

export default new articleCreateStore()