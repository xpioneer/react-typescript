import { observable, action, autorun, runInAction } from 'mobx';
import * as zh_CN from 'antd/lib/locale-provider/zh_CN'
import { store } from '@utils/tools'

const zhCN: any = zh_CN

class HomeStore {
  @observable collapsed: boolean = false
  @observable lang: any = store.get('Lang') === 'CN' ? zhCN : undefined
  
  @action toggleMenu = (): void => {
    this.collapsed = !this.collapsed
  }

  @action toggleLang = (value: any) => {
    store.set('Lang', !value ? 'CN' : 'EN')
    this.lang = !value ? zhCN : undefined
  }

}

export default new HomeStore()