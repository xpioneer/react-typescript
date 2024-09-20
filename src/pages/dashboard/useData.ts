import { useState, useEffect, useRef } from 'react'
import { GeographicStats } from 'types/dashboard'
import { getGeoGPSStats, getGeoGPSChina, getGeoVisit, getGeoMapStats } from '@/services/geography'
import { getMongoLogsStats } from 'services/api'
import { useAppStore } from '@/stores'
import { setChartData } from './echarts'
import { setGeoOptions, setGeoScene } from './antv'


export const useData = () => {

  const [{ colorPrimary }] = useAppStore()
  const [loading, setLoading] = useState(false)

  const visitRef = useRef<HTMLDivElement>(null)
  const geoRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<HTMLDivElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)

  const dataRef = useRef<GeographicStats[][]>([[], []])

  useEffect(() => {
    getMongoLogsStats().then(r => setChartData(r, [statusRef.current!, pathRef.current!]))
    setLoading(true)
    getGeoMapStats().then(r => {
      dataRef.current = r
      return setGeoScene([visitRef.current!, geoRef.current!])
    }).finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!loading && dataRef.current.every(i => i.length)) {
      setGeoOptions(dataRef.current, colorPrimary)
    }
  }, [colorPrimary, loading])

  return {
    visitRef,
    geoRef,
    pathRef,
    statusRef,
  }
}
