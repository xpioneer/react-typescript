import { observable, action, autorun, runInAction } from 'mobx';
import { message } from 'antd'

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
    console.log('login:', this.username, this.password)
    if(this.password.length < 6 || this.username.length < 3) {
      message.error('请输入正确格式的用户名和密码')
      return
    }

    $http.post('/api/login', {
      username: this.username,
      password: this.password
    }).then(res => {
      console.log(res)
    }, err => {
      message.error('用户名和密码错误!')
      console.log(err)
    })
  }

}

export default new LoginStore()