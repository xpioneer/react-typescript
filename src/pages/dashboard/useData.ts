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
  RadarChart,
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
  RadarChart,
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
  const scatterRef = useRef<HTMLDivElement>(null)

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

    setScatterData(data)
  }

  const setScatterData = (data: StatsData) => {
    const names: string[] = [], values: number[] = [], indicator: any[] = []

    data.statusCnt.errCnt.sort((a, b) => b.count - a.count).map((item) => {
      names.push(item.name)
      values.push(item.count)
      indicator.push({
        name: item.name,
        max: item.count < 100 ? 100 : 200
      })
      return [item.name, item.count]
    })
    
    Echarts.init(pathRef.current!, null, {
      width: pathRef.current!.clientWidth - 16
    }).setOption({
      title: {
        text: 'Error Status Chart',
        left: 'center',
      },
      grid: [
        {
          left: '3%',
          right: '15%',
          bottom: '3%',
          containLabel: true
        },
      ],
      xAxis: [
        {
          type: 'value'
        }
      ],
      yAxis: [
        {
          type: 'category',
          boundaryGap: true,
          data: names,
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      legend: {
        data: ['Error']
      },
      tooltip: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        formatter: function (param: any) {
          const {name, value, dataIndex} = param
          const isArray = Array.isArray(value)
          return `${name}: ${isArray ? value[dataIndex] : value}`
        }
      },
      radar: {
        center: ['85%', '45%'],
        // radius: '60%',
        // shape: 'circle',
        indicator,
        axisName: {
          color: '#64AFE9',
          // backgroundColor: '#666',
          borderRadius: 3,
          padding: [3, 5]
        },
        splitArea: {
          areaStyle: {
            color: ['#77EADF', '#26C3BE', '#64AFE9', '#428BD4'],
            shadowColor: 'rgba(0, 0, 0, 0.2)',
            shadowBlur: 10
          }
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(211, 253, 250, 0.8)'
          }
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(211, 253, 250, 0.8)'
          }
        }
      },
      series: [
        {
          name: 'Bar number',
          type: 'bar',
          barWidth: '60%',
          data: values,
        },
        {
          name: 'Error Status',
          type: 'radar',
          data: [
            {
              value: values,
              // name: 'Error total',
            },
          ],
          label: {
            show: true,
            formatter: function (params: any) {
              return params.value;
            }
          },
          areaStyle: {
            color: new Echarts.graphic.RadialGradient(0.1, 0.6, 1, [
              {
                color: 'rgba(255, 145, 124, 0.1)',
                offset: 0
              },
              {
                color: 'rgba(255, 145, 124, 0.9)',
                offset: 1
              }
            ])
          }
        }
      ]
    })
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
