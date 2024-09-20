
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

export type GeographicStats = {
  ip: string
  name_en: string
  sub_name_en: string
  latitude: string
  longitude: string
  total: string
}