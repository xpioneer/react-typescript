import { observable, action, autorun, runInAction, computed } from 'mobx';
import { GRAPHQL_API } from '@constants/index';

const postBall = `
mutation createBall($issue: String!, $reds: [Int]!, $blue: Int!, $drawDate: String){
  ball(issue: $issue, reds: $reds, blue: $blue, drawDate: $drawDate){id}
}`


class ballCreateStore {
  @observable loading: boolean = false
  @observable mainData: any = {} // tag detail data
  redBalls: number[] = [
    1,2,3,4,5,6,7,8,9,10,
    11,12,13,14,15,16,17,18,19,20,
    21,22,23,24,25,26,27,28,29,30,
    31,32,33
  ]
  blueBalls: number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
  @observable reds: number[] = []
  @observable blues: number[] = [0]

  @action selectBall = (num: number, type: 'red' | 'blue') => {
    if(type === 'red') {
      let index = this.reds.findIndex(v => v === num)
      if(index >= 0) { // selected, delete
        this.reds.splice(index, 1)
      } else { // not selected
        if(this.reds.length < 6) { // and length < 6
          this.reds.push(num)
        }
      }
    } else {
      this.blues = this.blues[0] === num ? [0] : [num]
    }
  }

  @action save = (cb: Function) => {
    this.loading = true

    $http.post(GRAPHQL_API, {
      query: postBall,
      variables: this.mainData
    }).then((res: any) => {
      const {ball:{id}} = res.data
      // cb(id)
      runInAction(() => {
        this.loading = false
      })
    }, err => {
      runInAction(() => {
        this.loading = false
      })
    })
  }

  @action inputChange = (value: string, type: string) => {
    this.mainData[type] = value.trim()
  }

}

export default new ballCreateStore()