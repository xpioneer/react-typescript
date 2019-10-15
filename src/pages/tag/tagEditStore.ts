import { observable, action, autorun, runInAction, computed } from 'mobx'
import { GRAPHQL_API } from '@constants/index'

const getTagById = `
query getTag($id: String!){
  tag(id: $id){
    id
    name
    remark
    createdAt
  }
}`

const postTag = `
mutation updateTag($id: String!, $name: String!, $remark: String){
  editTag(id: $id, name: $name, remark: $remark){
    id
  }
}`

class tagEditStore {
  @observable loading: boolean = false
  @observable mainData: any = {} // articleType detail data

  @action getDetail = (id: string) => {
    $http.post(GRAPHQL_API, {
      query: getTagById,
      variables: {id}
    }).then((res: any) => {
      const {tag} = res.data
      runInAction(() => {
        this.mainData = tag
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

    $http.post(GRAPHQL_API, {
      query: postTag,
      variables: this.mainData
    }).then((res: any) => {
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
    console.log('inputChange')
    this.mainData[type] = value.trim()
  }

}

export default new tagEditStore()