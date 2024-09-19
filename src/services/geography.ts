import { useRequest } from "./http"
import { SystemLog } from "@/types/geolog"
import { Method } from "@/types/demo"
import { GeographicStats } from "@/types/dashboard"

export const getGeologs = (params: any) => {
  return useRequest<SystemLog, true>('/log/geos', params, Method.GET)
}

export const getGeoGPSStats = () => {
  return useRequest<GeographicStats[]>('/log/geo/stats').then(r => r.data)
}

export const getGeoGPSChina = () => {
  return useRequest<GeographicStats[]>('/log/geo/china').then(r => r.data)
}
