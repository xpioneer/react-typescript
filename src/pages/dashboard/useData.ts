import { useState, useEffect, useRef } from 'react'
import { getGeoMapStats } from '@/services/geography'
import { getMongoLogsStats } from '@/services/api'
import { useAppStore } from '@/stores'
import { setChartData, setEarthMap } from './echarts'
import { setGeoOptions, setGeoScene, SetChartData } from './antv'

const data2List = (data: SetChartData[1]) => {
  const dest = {
    "name_en": "Matawan",
    "ip": "45.77.218.105",
    "sub_name_en": "New Jersey",
    "total": "49",
    "latitude": "40.4169",
    "longitude": "-74.2579"
  }
  const list: SetChartData[0] = [];

  data.forEach(i => {
    if(i.ip !== dest.ip) {
      const total = +i.total || 1
      const visit = {
        from: i.name_en || 'Unknow',
        to: dest.name_en,
        value: i.total,
        type: 'move_out',
        x: i.longitude,
        y: i.latitude,
        x1: dest.longitude,
        y1: dest.latitude,
      }
      const arr = []
      for(let i = 0; i < total; i++) {
        arr.push(visit)
      }
      list.push(...arr)
    }
  })

  console.log(data.length, list.length)
  return list
}

export const useData = () => {

  const [{ colorPrimary }] = useAppStore()
  const [loading, setLoading] = useState(false)

  const visitRef = useRef<HTMLDivElement>(null)
  const geoRef = useRef<HTMLDivElement>(null)
  const earthRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<HTMLDivElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  const earthBDRef = useRef<HTMLDivElement>(null)

  const dataRef = useRef<SetChartData>([[], []])

  useEffect(() => {
    getMongoLogsStats().then(r => setChartData(r, [statusRef.current!, pathRef.current!]))
    setLoading(true)
    getGeoMapStats().then(r => {
      dataRef.current = [data2List(r[0]), r[1]]
      return setGeoScene([visitRef.current!, geoRef.current!])
    }).finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!loading && dataRef.current.every(i => i.length)) {
      setGeoOptions(dataRef.current, colorPrimary)
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
