import { observable, action, autorun, runInAction } from 'mobx';
import { storage } from '@utils/tools'
import { JWT_TOKEN } from '@constants/index'

class LoginStore {
  @observable username: string = ''
  @observable password: string = ''
  
  @action inputChange = (value: string, type: string): void => {
    if(type === 'pwd') {
      this.password = value
    } else {
      this.username = value.trim()
    }
  }

  @action login = () => {
    if(this.password.length < 6 || this.username.length < 3) {
      $msg.error('请输入正确格式的用户名和密码')
      return
    }

    $http.post('/api/login', {
      username: this.username,
      password: this.password
    }).then((res: any) => {
      storage.set(JWT_TOKEN, res.token)
      location.replace('/home')
      console.log(res)
    }, err => {
      $msg.error('用户名和密码错误!')
    })
  }

}

export default new LoginStore()