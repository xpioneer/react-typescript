import { useState, useEffect, useRef } from 'react'
import * as Echarts from 'echarts/core'
import {
  DatasetComponent,
  DatasetComponentOption,
  TitleComponent,
  TitleComponentOption,
  ToolboxComponent,
  ToolboxComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  VisualMapComponent,
  VisualMapComponentOption,
  DataZoomComponent,
  DataZoomComponentOption,
  LegendComponent,
} from 'echarts/components'
import {
  BarChart,
  BarSeriesOption,
  LineChart,
  LineSeriesOption,
} from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { format } from 'date-fns'
import { StatsData } from 'types/dashboard'
import { useRequest } from "@/services/http"


Echarts.use([
  DatasetComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  DataZoomComponent,
  BarChart,
  CanvasRenderer,
  LegendComponent,
  LineChart,
])

type EChartsOption = Echarts.ComposeOption<
  | DatasetComponentOption
  | TitleComponentOption
  | ToolboxComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | VisualMapComponentOption
  | DataZoomComponentOption
  | BarSeriesOption
  | LineSeriesOption
>


const xAxisData = ['total', 200, 204, 400, 401, 403, 404, 405, 406, 500, 501, 502, 503, 504, 505]

const setOptions = (data: {
  normalData: number[]
  errData: number[]
}, el: HTMLDivElement) => {
    
  const option: EChartsOption = {
    title: {
      text: 'Success and Error Relationship',
      left: 'center'
    },
    grid: {
      bottom: 80
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        restore: {},
        saveAsImage: {}
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        animation: false,
        label: {
          backgroundColor: '#505765'
        }
      }
    },
    legend: {
      data: ['Success', 'Error'],
      left: 10
    },
    dataZoom: [
      {
        show: true,
        realtime: true,
        start: 65,
        end: 85
      },
      {
        type: 'inside',
        realtime: true,
        start: 65,
        end: 85
      }
    ],
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        axisLine: { onZero: false },
        // nameRotate: 45,
        data: xAxisData
        
      }
    ],
    yAxis: [
      {
        name: 'Success(次数)',
        type: 'value'
      },
      {
        name: 'Error(次数)',
        nameLocation: 'start',
        alignTicks: true,
        type: 'value',
        inverse: true
      }
    ],
    series: [
      {
        name: 'Success',
        type: 'line',
        areaStyle: {},
        lineStyle: {
          width: 1
        },
        emphasis: {
          focus: 'series'
        },
        markArea: {
          silent: true,
          itemStyle: {
            opacity: 0.3
          },
          data: [
            [
              {
                xAxis: '400'
              },
              {
                xAxis: '500'
              }
            ]
          ]
        },
        data: data.normalData,
      },
      {
        name: 'Error',
        type: 'line',
        yAxisIndex: 1,
        areaStyle: {},
        lineStyle: {
          width: 1
        },
        emphasis: {
          focus: 'series'
        },
        markArea: {
          silent: true,
          itemStyle: {
            opacity: 0.3
          },
          data: [
            [
              {
                xAxis: '400'
              },
              {
                xAxis: '500'
              },
            ]
          ]
        },
        data: data.errData,
      }
    ]
  }

  Echarts.init(el, null, {
    width: el.clientWidth - 16
  }).setOption(option)
}


export const useData = () => {
  const pathRef = useRef<HTMLDivElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)

  const setChartData = (data: StatsData) => {
    const normalMap = data.statusCnt.apiCnt.reduce<AnyObject<number>>((p, c) => {
      return {
        ...p,
        [c.name]: c.count
      }
    }, {
      total: data.statusCnt.apiCnt.reduce((p, c) => p + c.count, 0)
    });

    const errList = data.statusCnt.errCnt
    const errMap = errList.reduce<AnyObject<number>>((p, c) => {
      return {
        ...p,
        [c.name]: c.count
      }
    }, {
      total: errList.reduce((p, c) => p + c.count, 0)
    })

    const normalData = xAxisData.map((item, index) => normalMap[item] || 0)
    const errData = xAxisData.map((item, index) => errMap[item])

    setOptions({
      normalData,
      errData,
    }, statusRef.current!)
  }

  const onQuery = () => {
    useRequest<StatsData>('/log/stats').then(setChartData)
  }

  useEffect(() => {
    onQuery()
  }, [])

  return {
    pathRef,
    statusRef,
  }
}
