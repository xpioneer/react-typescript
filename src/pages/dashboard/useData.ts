import { useState, useEffect, useRef } from 'react'
import { GeographicStats } from 'types/dashboard'
import { getGeoGPSStats, getGeoGPSChina } from '@/services/geography'
import { getMongoLogsStats } from 'services/api'
import { useAppStore } from '@/stores'
import { setChartData } from './echarts'
import { setGeoOption, setGeoScene } from './antv'

export const useData = () => {

  const [{colorPrimary}] = useAppStore()
  const [loading, setLoading] = useState(false)

  const geoRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<HTMLDivElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)

  const dataRef = useRef<GeographicStats[]>([])

  useEffect(() => {
    getMongoLogsStats().then(r => setChartData(r, [statusRef.current!, pathRef.current!]))
    setLoading(true)
    getGeoGPSStats().then((r) => {
      dataRef.current = r;
      return setGeoScene(geoRef.current!)
    })
    .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if(!loading && dataRef.current.length) {
      setGeoOption(dataRef.current, colorPrimary)
    }
  }, [colorPrimary, loading])

  return {
    geoRef,
    pathRef,
    statusRef,
  }
}
