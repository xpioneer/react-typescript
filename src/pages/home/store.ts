import { observable, action, autorun, runInAction } from 'mobx';
import * as zh_CN from 'antd/lib/locale-provider/zh_CN'
import { store, Storage } from '@utils/tools'

const zhCN: any = zh_CN

class HomeStore {
  @observable collapsed: boolean = false
  @observable lang: any
  
  @action toggleMenu = (): void => {
    this.collapsed = !this.collapsed
  }

  @action toggleLang = (value: any) => {
    console.log(store, Storage)
    this.lang = !value ? zhCN : undefined
  }

}

export default new HomeStore()