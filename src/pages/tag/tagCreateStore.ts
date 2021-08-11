import { observable, action, autorun, runInAction, computed } from 'mobx'
import { GRAPHQL_API } from '@constants/index'

const postTag = `
mutation createTag($name: String!, $remark: String){
  tag(name: $name, remark: $remark){id}
}`

class tagCreateStore {
  @observable loading: boolean = false
  @observable mainData: any = {} // tag detail data

  @action save = (cb: Function) => {
    this.loading = true

    $http.post(GRAPHQL_API, {
      query: postTag,
      variables: this.mainData
    }).then((res: any) => {
      const {tag: {id}} = res.data
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

  @action inputChange = (value: string, type: string) => {
    this.mainData[type] = value.trim()
  }

}

export default new tagCreateStore()