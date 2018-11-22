import { observable, action, autorun, runInAction } from 'mobx';
import { message } from 'antd'

class apiLogStore {
  @observable loading: boolean = false
  @observable list: [] = []
  @observable meta: object = {}
  
  
  // @action search = (): void => {
  //   if(type === 'pwd') {
  //     this.password = value
  //   } else {
  //     this.username = value.trim()
  //   }
  // }

  @action search = () => {
    this.loading = true
    // console.log('login:', this.username, this.password)
    // if(this.password.length < 6 || this.username.length < 3) {
    //   message.error('请输入正确格式的用户名和密码')
    //   return
    // }

    $http.get('/api/log-api', {
      // username: this.username,
      // password: this.password
    }).then((res: any) => {
      runInAction(() => {
        this.loading = false
        this.list = res.data
        this.meta = res.meta
      })
      
      console.log(res)
    }, err => {
      runInAction(() => {
        this.loading = false
      })
      message.error('用户名和密码错误!')
      console.log(err)
    })
  }

}

export default new apiLogStore()