import { observable, action, autorun, runInAction, computed } from 'mobx'
import { GRAPHQL_API } from '@constants/index'

const getUser = `
{
  user(id: $id){
    id
    username
    nickName
    userType
    sex
    createdAt
    remark
  }
}`

const postUser = `
mutation updateUser($id: String!, $username: String!, $nickName: String!, $password: String, $userType: Int!, $sex: Int!, $remark: String){
  editUser(id: $id, username: $username, nickName: $nickName, password: $password, userType: $userType, sex: $sex remark: $remark){id}
}`

class userEditStore {
  timer: any = null

  @observable loading: boolean = false
  @observable mainData: any = {
    password: ''
  } // user detail data

  @action getDetail = (id: string) => {
    $http.post(GRAPHQL_API, {
      query: getUser,
      variables: {id}
    }).then((res: any) => {
      const {user} = res.data
      runInAction(() => {
        this.mainData = user
        this.loading = false
      })
    }, err => {
      runInAction(() => {
        this.loading = false
      })
    })
  }

  @action update = (cb: Function) => {
    let pwd = this.mainData['password']
    if (pwd && pwd.length > 0 && pwd.length < 6) {
      $msg.warn('密码长度必须大于6')
      return
    }

    this.loading = true
    $http.post(GRAPHQL_API, {
      query: postUser,
      variables: this.mainData
    }).then((res: any) => {
      this.getDetail(this.mainData.id)
      runInAction(() => {
        this.loading = false
      })
    }, err => {
      runInAction(() => { this.loading = false })
    })
  }

  @action inputChange = (value: string, type: string) => {
    this.mainData[type] = (type === 'password' || typeof(value) === 'number') ? value : value.trim()
  }

}

export default new userEditStore()