import { observable, action, autorun, runInAction, computed } from 'mobx';
import { GRAPHQL_API } from '@constants/index';

const queryChart = `
fragment common on ballChartType { name value }
query ball{
  ballCount{reds{...common},blues{...common}}
}`


class ballChartStore {
  @observable loading: boolean = false
  redBalls: number[] = [
    1,2,3,4,5,6,7,8,9,10,
    11,12,13,14,15,16,17,18,19,20,
    21,22,23,24,25,26,27,28,29,30,
    31,32,33
  ]
  blueBalls: number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
  @observable reds: number[] = []
  @observable blues: number[] = []

  chart: HTMLElement = null

  setChart = (ref: HTMLElement) => {
    this.chart = ref
  }

  @action fetchChartData = (cb: Function) => {
    this.loading = true
    $http.post(GRAPHQL_API, {
      query: queryChart,
      variables: {}
    }).then((res: any) => {
      const {ballCount} = res.data
      runInAction(() => {
        this.loading = false
        // this.reds = ballCount.reds
        // this.blues = ballCount.blues
        console.log(ballCount)
        cb && cb(ballCount.reds, ballCount.blues)
      })
    }, err => {
      runInAction(() => {
        this.loading = false
      })
    })
  }

}

export default new ballChartStore()