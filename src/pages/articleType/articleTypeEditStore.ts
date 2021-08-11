import { observable, action, autorun, runInAction, computed } from 'mobx'
import { GRAPHQL_API } from '@constants/index'

const getArticleTypeById = `
query getArticleType($id: String!){
  articleType(id: $id){
    id
    name
    remark
    createdAt
  }
}`

const postArticleType = `
mutation updateArticleType($id: String!, $name: String!, $remark: String){
  editArticleType(id: $id, name: $name, remark: $remark){
    id
  }
}`

class articleTypeEditStore {
  @observable loading: boolean = false
  @observable mainData: any = {} // articleType detail data

  @action getDetail = (id: string) => {
    $http.post(GRAPHQL_API, {
      query: getArticleTypeById,
      variables: {id}
    }).then((res: any) => {
      const {articleType} = res.data
      runInAction(() => {
        this.mainData = articleType
        this.loading = false
      })
    }, err => {
      runInAction(() => {
        this.loading = false
      })
    })
  }

  @action update = (cb: Function) => {
    this.loading = true

    $http.post('/graphql', {
      query: postArticleType,
      variables: this.mainData
    }).then((res: any) => {
      const {editArticleType: {id}} = res.data
      runInAction(() => {
        this.loading = false

        this.getDetail(this.mainData.id)
      })
    }, err => {
      runInAction(() => {
        this.loading = false
      })
    })
  }

  @action inputChange = (value: string, type: string) => {
    this.mainData[type] = value.trim()
  }

}

export default new articleTypeEditStore()