import { observable, action, autorun, runInAction } from 'mobx'
import * as zh_CN from 'antd/lib/locale-provider/zh_CN'
import { storage } from '@utils/tools'
import { JWT_TOKEN, SYS_LANG } from '@constants/index'

const zhCN: any = zh_CN

class HomeStore {
  @observable authorized: boolean = true
  // @observable authorized: boolean = (storage.get(JWT_TOKEN) || '').split('.').length === 3
  @observable collapsed: boolean = false
  @observable lang: any = storage.get(SYS_LANG) === 'CN' ? zhCN : undefined
  
  @action toggleMenu = (): void => {
    this.collapsed = !this.collapsed
  }

  @action toggleLang = (value: any) => {
    storage.set(SYS_LANG, !value ? 'CN' : 'EN')
    this.lang = !value ? zhCN : undefined
  }

  @action logout = () => {
    $http.post('/api/logout', {}).then((res: any) => {
      // storage.remove(JWT_TOKEN)
      // location.replace('/login')
    }, err => {
      // $msg.error(err.msg)
    })
  }

}

export default new HomeStore()