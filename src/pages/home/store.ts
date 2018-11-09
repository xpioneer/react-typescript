import { observable, action, autorun, runInAction } from 'mobx';

class HomeStore {
  @observable collapsed: boolean = false
  
  @action toggleMenu = (): void => {
    this.collapsed = !this.collapsed
  }

}

export default new HomeStore()