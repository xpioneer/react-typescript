import { useState, useEffect, useRef } from 'react'
import { getGeoMapStats } from '@/services/geography'
import { getMongoLogsStats } from '@/services/api'
import { useAppState } from '@/stores'
import { GeographicStats } from '@/types/dashboard'
import { setChartData } from './echarts'
import { setGeoOptions, setGeoScene, SetChartData, IScenes } from './antv'

const data2List = (data: GeographicStats[]) => {
  const dest = {
    "name_en": "Matawan",
    "ip": "45.77.218.105",
    "sub_name_en": "New Jersey",
    "total": "49",
    "latitude": "40.4169",
    "longitude": "-74.2579"
  }
  
  // 优化点：原来的1691条原始数据会变成7810条，不再通过循环 push 来倍增数据。
  return data.filter(i => i.ip !== dest.ip).map(i => ({
    from: i.name_en || 'Unknown',
    to: dest.name_en,
    total: +i.total || 1, // 将数量作为属性传下去，由图层 size 控制粗细
    value: i.total,
    type: 'move_out',
    x: i.longitude,
    y: i.latitude,
    x1: dest.longitude,
    y1: dest.latitude,
  }))
}

export const useData = () => {

  const { colorPrimary } = useAppState()
  const [loading, setLoading] = useState(false)

  const visitRef = useRef<HTMLDivElement>(null)
  const geoRef = useRef<HTMLDivElement>(null)
  const earthRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<HTMLDivElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  const earthBDRef = useRef<HTMLDivElement>(null)

  const dataRef = useRef<SetChartData>([[], []])
  const scenesRef = useRef<IScenes | null>(null)

  useEffect(() => {
    getMongoLogsStats().then(r => setChartData(r, [statusRef.current!, pathRef.current!]))
    setLoading(true)
    getGeoMapStats().then(r => {
      dataRef.current = [data2List(r[0]), r[1]]
      return setGeoScene([visitRef.current!, geoRef.current!, earthRef.current!])
    }).then(scenes => {
      scenesRef.current = scenes
    }).finally(() => setLoading(false))
    return () => {
      if (scenesRef.current) {
        scenesRef.current.visitScene?.destroy()
        scenesRef.current.geoScene?.destroy()
        scenesRef.current.earthScene?.destroy()
      }
    }
  }, [])

  useEffect(() => {
    if (!loading && dataRef.current.every(i => i.length) && scenesRef.current) {
      setGeoOptions(scenesRef.current, dataRef.current, colorPrimary)
      // setEarthMap(dataRef.current[0], earthBDRef.current!)
    }
  }, [colorPrimary, loading])

  return {
    visitRef,
    geoRef,
    earthRef,
    pathRef,
    statusRef,
    earthBDRef,
  }
}
