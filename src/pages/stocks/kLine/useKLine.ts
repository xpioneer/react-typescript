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
  // MarkLineComponentOption,
} from 'echarts/components'
import {
  CandlestickChart,
  CandlestickSeriesOption,
  BarChart,
  BarSeriesOption,
  LineSeriesOption,
} from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { format } from 'date-fns'
import { stockPageList } from 'services/stock'
import { stockHistoryList } from 'services/stockHistory'
import { debounce } from 'utils/debounce'
import { StockHistory } from 'types/stockHistory'

Echarts.use([
  DatasetComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  DataZoomComponent,
  CandlestickChart,
  BarChart,
  CanvasRenderer
])

type EChartsOption = Echarts.ComposeOption<
| DatasetComponentOption
| TitleComponentOption
| ToolboxComponentOption
| TooltipComponentOption
| GridComponentOption
| VisualMapComponentOption
| DataZoomComponentOption
| CandlestickSeriesOption
| BarSeriesOption
| LineSeriesOption
>

interface IData {
  days: string[]
  values: [number, number, number, number][]
  volumes: number[]
}

export const useKLine = () => {
  const chartRef = useRef<HTMLDivElement>(null)

  const [loading, setLoading] = useState(false)
  const [stockOpts, setStockOpts] = useState<IOption<number>[]>([])


  const setOption = (list: StockHistory[], id: number) => {
    const data: IData = {
      days: [],
      values: [],
      volumes: []
    }
    // Each item: open，close，lowest，highest
    list.map(i => {
      data.days.push(format(i.timestamp, 'yyyy/MM/dd')),
      data.values.push([i.open, i.close, i.low, i.high]),
      data.volumes.push(i.volume)
    })

    // console.log(data.days, '>>>>')

    const calculateMA = (dayCount: number) => {
      var result = [];
      for (var i = 0, len = data.values.length; i < len; i++) {
        if (i < dayCount) {
          result.push('-');
          continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
          sum += +data.values[i - j][1];
        }
        result.push(sum / dayCount);
      }
      return result;
    }

    const upColor = '#ec0000';
    const upBorderColor = '#8A0000';
    const downColor = '#00da3c';
    const downBorderColor = '#008F28';

    const option: EChartsOption = {
      title: {
        text: stockOpts.find(i => i.value === id)?.label,
        left: 0
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      legend: {
        data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '5%'
      },
      xAxis: {
        type: 'category',
        data: data.days,
        boundaryGap: false,
        axisLine: { onZero: false },
        splitLine: { show: false },
        min: 'dataMin',
        max: 'dataMax'
      },
      yAxis: {
        scale: true,
        splitArea: {
          show: true
        }
      },
      dataZoom: [
        {
          type: 'inside',
          start: 50,
          end: 100
        },
        {
          show: true,
          type: 'slider',
          top: '90%',
          start: 50,
          end: 100
        }
      ],
      series: [
        {
          name: 'Volume',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          itemStyle: {
            color: '#7fbe9e'
          },
          emphasis: {
            itemStyle: {
              color: '#140'
            }
          },
          data: data.values
        },
        {
          name: '日K',
          type: 'candlestick',
          data: data.values,
          itemStyle: {
            color: upColor,
            color0: downColor,
            borderColor: upBorderColor,
            borderColor0: downBorderColor
          },
          markPoint: {
            label: {
              formatter: (param) => {
                return param != null ? Math.round(+param.value) + '' : '';
              }
            },
            data: [
              {
                name: 'Mark',
                // coord: ['2013/5/31', 2300],
                // value: 2300,
                itemStyle: {
                  color: 'rgb(41,60,85)'
                }
              },
              {
                name: 'highest value',
                type: 'max',
                valueDim: 'highest'
              },
              {
                name: 'lowest value',
                type: 'min',
                valueDim: 'lowest'
              },
              {
                name: 'average value on close',
                type: 'average',
                valueDim: 'close'
              }
            ],
            tooltip: {
              formatter: (param: any) => {
                return param.name + '<br>' + (param.data.coord || '');
              }
            }
          },
          markLine: {
            symbol: ['none', 'none'],
            data: [
              [
                {
                  name: 'from lowest to highest',
                  type: 'min',
                  valueDim: 'lowest',
                  symbol: 'circle',
                  symbolSize: 10,
                  label: {
                    show: false
                  },
                  emphasis: {
                    label: {
                      show: false
                    }
                  }
                },
                {
                  type: 'max',
                  valueDim: 'highest',
                  symbol: 'circle',
                  symbolSize: 10,
                  label: {
                    show: false
                  },
                  emphasis: {
                    label: {
                      show: false
                    }
                  }
                }
              ],
              {
                name: 'min line on close',
                type: 'min',
                valueDim: 'close'
              },
              {
                name: 'max line on close',
                type: 'max',
                valueDim: 'close'
              }
            ]
          }
        },
        {
          name: 'MA5',
          type: 'line',
          data: calculateMA(5),
          smooth: true,
          lineStyle: {
            opacity: 0.5
          }
        },
        {
          name: 'MA10',
          type: 'line',
          data: calculateMA(10),
          smooth: true,
          lineStyle: {
            opacity: 0.5
          }
        },
        {
          name: 'MA20',
          type: 'line',
          data: calculateMA(20),
          smooth: true,
          lineStyle: {
            opacity: 0.5
          }
        },
        {
          name: 'MA30',
          type: 'line',
          data: calculateMA(30),
          smooth: true,
          lineStyle: {
            opacity: 0.5
          }
        }
      ]
    }
     Echarts.init(chartRef.current).setOption(option)
  }

  const onQuery = (id: number) => {
    setLoading(true)
    stockHistoryList({
      id,
      // page: 1,
      pageSize: 30 * 250,
      noPage: true
    }).then(res => {
      // console.log(res, '>>>return')
      setOption(res, id)
    }).finally(() => setLoading(false))
  }

  const onSelectSearch = debounce((v: string) => {
    if(!v.trim()) {
      return
    }
    stockPageList({
      code: v,
      name: v,
      page: 1,
      pageSize: 100,
      noPage: true
    }).then(res => {
      const list = res.data.map<IOption<number>>(item => ({value: item.id, label: item.name}))
      setStockOpts(list)
    })
  }, 500)

  return {
    loading,
    chartRef,
    stockOpts,
    onQuery,
    onSelectSearch,
  }
}