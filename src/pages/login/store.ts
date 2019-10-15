import { observable, action, computed, autorun, runInAction } from 'mobx'
import { storage } from '@utils/tools'
import { JWT_TOKEN, REDIRECT_URL } from '@constants/index'

class LoginStore {
  @observable username: string = ''
  @observable password: string = ''
  @observable loading: boolean = false
  
  @action inputChange = (value: string, type: string): void => {
    if(type === 'pwd') {
      this.password = value
    } else {
      this.username = value.trim()
    }
  }

  @computed get canLogin () {
    return this.password.length > 5 && this.username.length > 2
  }

  @action login = () => {
    if(this.loading) {
      return
    }
    if(!this.canLogin) {
      $msg.error('请输入正确格式的用户名和密码')
      return
    }
    this.loading = true
    $http.post('/api/login', {
      username: this.username,
      password: this.password
    }).then((res: any) => {
      storage.set(JWT_TOKEN, res.data) // store jwt token
      location.replace(sessionStorage.getItem(REDIRECT_URL) || '/home')
      runInAction(() => {
        this.loading = false
      })
    }, err => {
      runInAction(() => {
        this.loading = false
      })
    })
  }

}

export default new LoginStore()