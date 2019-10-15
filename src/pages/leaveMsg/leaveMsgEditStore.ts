import { observable, action, autorun, runInAction, computed } from 'mobx'
import { GRAPHQL_API } from '@constants/index'

const getLeaveMsg = `
query getLeaveMsg($id: String!){
  leaveMsg(id: $id){
    id
    description
    ip
    createdAt
  }
}`

class leaveMsgEditStore {
  @observable loading: boolean = false
  @observable mainData: any = {} // articleType detail data

  @action getDetail = (id: string) => {
    $http.post(GRAPHQL_API, {
      query: getLeaveMsg,
      variables: {id}
    }).then((res: any) => {
      const {leaveMsg} = res.data
      runInAction(() => {
        this.mainData = leaveMsg
        this.loading = false
      })
    }, err => {
      runInAction(() => {
        this.loading = false
      })
    })
  }

}

export default new leaveMsgEditStore()