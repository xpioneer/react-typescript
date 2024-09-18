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
  GeoComponent,
  GeoComponentOption,
} from 'echarts/components'
import {
  BarChart,
  BarSeriesOption,
  LineChart,
  LineSeriesOption,
  RadarChart,
  ScatterChart
} from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { GeographicStats, StatsData } from 'types/dashboard'
import 'echarts/extension/bmap/bmap';
import { getGeoGPSStats } from '@/services/geography'
import { getMongoLogsStats } from 'services/api'
import { PointLayer, Scene } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';
import { useAppStore } from '@/stores'
// import ChinaMapSVG from '@assets/china.svg'


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
  GeoComponent,
  ScatterChart,
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

function hexToRgba(hex: string) {
  hex = hex.replace(/^#/, '').padStart(6, '0');

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return (alpha = 1) => `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

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

let geoScene: Scene | null = null

const setGeoOption = (data: GeographicStats[], colorPrimary: string) => {
  const color = hexToRgba(colorPrimary)
  const values = data.map<number>(i => +i.total)
  const max = Math.max(...values)
  const pointLayer = new PointLayer({})
    .source(data, {
      parser: {
        type: 'json',
        x: 'longitude',
        y: 'latitude',
      }
    })
    .shape('circle')
    .size('total', (t) => {
      if(isNaN(t)) {
        return 0
      }
      if(t <= 4) {
        return 2
      } else {
        const v = +t/2 + 2
        return Math.floor(v <= 100 ? v : v / 10)
      }
    })
    // .shape('cylinder')
    // .size('total', function (level) {
    //   return [2, 2, level];
    // })
    .color('total', (c) => {
      return color(Math.ceil(+c/max * 16))
    })
    .active(true)
    .style({
      opacity: 0.6,
      strokeWidth: 0.5,
    });
  geoScene!.addLayer(pointLayer);

  // Echarts.registerMap("china", {svg: ChinaMapSVG})
  // Echarts.init(el).setOption({
  //   title: {
  //     text: 'Geographic Location of Requests Worldwide',
  //     left: 'center',
  //     // textStyle: {
  //     //   color: '#fff'
  //     // }
  //   },
  //   geo: {
  //     map: 'china',
  //     roam: true,
  //     label: {
  //       emphasis: {
  //         show: false
  //       }
  //     },
  //     silent: true,
  //     itemStyle: {
  //       normal: {
  //         areaColor: '#323c48',
  //         borderColor: '#111'
  //       },
  //       emphasis: {
  //         areaColor: '#2a333d'
  //       }
  //     }
  //   },
  //   series: [
  //     {
  //       name: 'GPS Location',
  //       type: 'scatterGL',
  //       // progressive: 1e6,
  //       coordinateSystem: 'geo',
  //       // symbolSize: 1,
  //       // zoomScale: 0.002,
  //       blendMode: 'lighter',
  //       large: true,
  //       itemStyle: {
  //         color: 'rgb(20, 15, 2)'
  //       },
  //       postEffect: {
  //         enable: true
  //       },
  //       silent: true,
  //       // dimensions: ['lng', 'lat'],
  //       data: data.map(i => ({
  //         name: i.city_en,
  //         symbolSize: i.total,
  //         value: [i.longitude, i.latitude]
  //       }))
  //     }
  //   ]
  // })
}

export const useData = () => {

  const [{colorPrimary}] = useAppStore()
  const [loading, setLoading] = useState(false)

  const geoRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<HTMLDivElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)

  const dataRef = useRef<GeographicStats[]>([])

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

  useEffect(() => {
    getMongoLogsStats().then(setChartData)
    setLoading(true)
    getGeoGPSStats().then((r) => {
      dataRef.current = r;
      geoScene = new Scene({
        id: geoRef.current!,
        map: new GaodeMap({
          pitch: 0,
          style: 'dark',
          center: [120, 34],
          zoom: 3,
          token: '6f025e700cbacbb0bb866712d20bb35c',
        }),
      });
    })
    .then(() => {
      geoScene!.on('loaded', () => {
        console.log('loaded..', Date.now())
        setLoading(false)
      });
    })
    .finally(() => {console.log('finally~', Date.now())})
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
