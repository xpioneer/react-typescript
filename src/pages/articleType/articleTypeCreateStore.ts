import { observable, action, autorun, runInAction, computed } from 'mobx';
import { GRAPHQL_API } from '@constants/index';

const postArticleType = `
mutation createArticleType($name: String!, $remark: String){
  articleType(name: $name, remark: $remark){id}
}`

class articleTypeCreateStore {
  @observable loading: boolean = false
  @observable mainData: any = {} // articleType detail data

  @action save = (cb: Function) => {
    this.loading = true

    $http.post(GRAPHQL_API, {
      query: postArticleType,
      variables: this.mainData
    }).then((res: any) => {
      const {articleType:{id}} = res.data
      cb(id)
      runInAction(() => {
        this.loading = false
      })
    }, err => {
      runInAction(() => {
        this.loading = false
      })
      // message.error(err[0].message)
    })
  }

  @action inputChange = (value: string, type: string) => {
    this.mainData[type] = value.trim()
  }

}

export default new articleTypeCreateStore()