import { observable, action, autorun, runInAction, computed } from 'mobx';
import { GRAPHQL_API } from '@constants/index'

const getCommentById = `
query getComment($id: String!){
  comment(id: $id){
    id
    description
    articleId
    ip
    client
    createdAt
  }
}`

class commentEditStore {
  @observable loading: boolean = false
  @observable mainData: any = {} // articleType detail data

  @action getDetail = (id: string) => {
    $http.post(GRAPHQL_API, {
      query: getCommentById,
      variables: {id}
    }).then((res: any) => {
      const {comment} = res.data
      runInAction(() => {
        this.mainData = comment
        this.loading = false
      })
    }, err => {
      runInAction(() => {
        this.loading = false
      })
    })
  }

}

export default new commentEditStore()