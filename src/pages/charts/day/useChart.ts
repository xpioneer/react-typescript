import { useState, useRef, useEffect } from 'react'
import * as Echart from 'echarts/core'
import {
  LegendComponent, TitleComponent, TooltipComponent, GridComponent,
  VisualMapComponent, CalendarComponent, 
} from 'echarts/components'
import {
  BarChart, LineChart, HeatmapChart,
} from 'echarts/charts'
import { dateFormat } from '@/utils/tools'
import { CanvasRenderer } from 'echarts/renderers'
import { getEveryDay } from 'services/chart'
import { DayChart } from '@/types/chart'
import { DateFormat } from '@/types/base'
import { useAppStore } from '@/stores'

Echart.use([
  BarChart,
  LineChart,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  CanvasRenderer,
  VisualMapComponent,
  HeatmapChart,
  CalendarComponent,
])


let barChart: Echart.ECharts | null = null
let heatChart: Echart.ECharts | null = null

export const useChart = () => {

  const [{colorPrimary}] = useAppStore()

  const chartRef = useRef<HTMLDivElement>(null)
  const heatRef = useRef<HTMLDivElement>(null)
  const dataRef = useRef<DayChart[]>([])

  const [loading, setLoading] = useState(false)

  const setOption = (vals: DayChart[]) => {
    const xData: string[] = [], data: number[] = [], heatData: any[][] = []
    vals.forEach(v => {
      const date = dateFormat(v.d, DateFormat.DateDiagonal), value = v.total
      xData.push(date)
      data.push(value)
      heatData.push([date, value])
    })
    barChart!.setOption({
      title: {
        text: '请求数量',
        top: 15,
        left: 'center',
      },
      tooltip: {},
      grid: {
        left: '2%',
        right: '2%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: xData,
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '次数',
          type: 'bar',
          data,
        },
        // {
        //   data,
        //   type: 'line',
        //   smooth: true,
        //   color: '#5a6fc0'
        // }
      ],
      color: [colorPrimary]
    })

    // heatChart = heatChart ? heatChart : Echart.init(chartRef.current)
    heatChart!.setOption({
      title: {
        text: 'Daily Request Count',
        top: 12,
        left: 'center',
      },
      tooltip: {
        position: 'top'
      },
      visualMap: {
        min: 0,
        max: 600,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        top: 50,
        // left: 200,
        inRange: {
          // color: ['#50a3ba', '#eac763', '#d94e5d']
          color: ['#fff', colorPrimary]
        },
      },
      calendar: [
        {
          top: 130,
          left: 65,
          right: 20,
          range: '2018',
          cellSize: ['auto', 20],
          itemStyle: {
            borderWidth: 0.5,
            color: 'rgba(255,255,255,0.7)'
          },
        },
        {
          top: 320,
          left: 65,
          right: 20,
          range: '2017',
          cellSize: ['auto', 20],
          itemStyle: {
            borderWidth: 0.5,
            color: 'rgba(255,255,255,0.7)'
          },
        },
      ],
      series: [
        {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          calendarIndex: 0,
          data: heatData,
        },
        {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          calendarIndex: 1,
          data: heatData,
        },
      ],
    })
  }

  const onQuery = () => {
    setLoading(true)
    getEveryDay().then(r => dataRef.current = r).then(() => {
      barChart = Echart.init(chartRef.current)
      heatChart = Echart.init(heatRef.current)
    }).finally(() => setLoading(false))
  }

  useEffect(() => {
    onQuery()
  }, [])

  useEffect(() => {
    if(!loading && dataRef.current.length) {
      setOption(dataRef.current)
    }
  }, [colorPrimary, loading])

  return {
    heatRef,
    chartRef,
    loading,
  }
}
