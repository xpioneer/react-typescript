import { DayChart } from '@/types/chart'
import { useRequest } from './http'
import { Method } from '@/types/demo'



export const getEveryDay = () => {
  return useRequest<DayChart[]>('/log/geo/day', undefined, Method.GET).then(res => res.data)
}