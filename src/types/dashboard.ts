
type Stats = {
  count: number
  name: string
}

export class StatsData {
  statusCnt: {
    apiCnt: Stats[]
    errCnt: Stats[]
  }
  pathCnt: {
    apiCnt: Stats[]
    errCnt: Stats[]
  }
}