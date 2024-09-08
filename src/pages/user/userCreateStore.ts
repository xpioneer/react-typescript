import { observable, action, autorun, runInAction, computed } from 'mobx'
import { GRAPHQL_API } from '@constants/index'

const postUser = `
mutation createArticleType($username: String!, $nickName: String!, $password: String!, $userType: Int!, $sex: Int!, $remark: String){
  user(username: $username, nickName: $nickName, password: $password, userType: $userType, sex: $sex remark: $remark){id}
}`

class userCreateStore {
  timer: any = null

  @observable loading: boolean = false
  @observable mainData: any = {
    sex: 0,
    userType: 9
  } // user detail data
  @observable password = {
    pwd: '',
    confirmPwd: ''
  }
  @computed get pwdPass (): boolean {
    return this.password.pwd.length > 5 && this.password.confirmPwd.length > 5 && this.password.pwd.length === this.password.confirmPwd.length
  }

  @action save = (cb: Function) => {
    if (!this.pwdPass) {
      $msg.warning('密码长度必须大于6，且必须相同')
      return
    } else {
      this.mainData['password'] = this.password.pwd
    }

    this.loading = true

    $http.post(GRAPHQL_API, {
      query: postUser,
      variables: this.mainData
    }).then((res: any) => {
      const {user: {id}} = res.data
      cb(id)
      runInAction(() => { this.loading = false })
    }, err => {
      runInAction(() => { this.loading = false })
    })
  }

  @action inputChange = (value: string, type: string) => {
    this.mainData[type] =  typeof(value) === 'number' ? value : value.trim()
  }

  @action pwdChange = (value: string, type: string) => {
    this.password[type as keyof typeof this.password] = value
    if (this.password.pwd.length > 0 &&
      this.password.confirmPwd.length > 0 &&
      this.password.pwd !== this.password.confirmPwd) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        $msg.warning('密码不一致！')
      }, 600)
    } else if (this.password.pwd === this.password.confirmPwd) {
      clearTimeout(this.timer)
      $msg.success('密码已确认！')
    }
  }

}

export default new userCreateStore()