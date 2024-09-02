import { useState, useRef, useEffect } from 'react'
import * as Echart from 'echarts/core'
import {
  LegendComponent, TitleComponent, TooltipComponent, GridComponent,
} from 'echarts/components'
import {
  BarChart, LineChart,
} from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { useGraphQL } from 'services/http'
import { BallChart, ChartOption } from 'models/ball'

const query = `
fragment common on ballChartType { name value }
query ball{
  ballCount{reds{...common},blues{...common},redDisList{...common}}
}`

Echart.use([
  BarChart,
  LineChart,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  CanvasRenderer
])

export const useChart = () => {

  const chartRef = useRef<HTMLDivElement>(null)
  const redRef = useRef<HTMLDivElement>(null)
  const blueRef = useRef<HTMLDivElement>(null)

  const [loading, setLoading] = useState(false)

  const setRedOption = (reds: ChartOption[]) => { 
    redRef.current && Echart.init(redRef.current).setOption({
      title: {
        text: '红球'
      },
      tooltip: {},
      grid: {
        left: '2%',
        right: '2%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        data: reds.map(v => v.name)
      },
      yAxis: {},
      series: [{
        name: '次数',
        type: 'bar',
        data: reds.map(v => v.value)
      }],
      color: ['#f54646']
    })
  }

  const setBlueOption = (blues: ChartOption[]) => { 
    blueRef.current && Echart.init(blueRef.current).setOption({
      title: {
        text: '蓝球'
      },
      tooltip: {},
      grid: {
        left: '2%',
        right: '2%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        data: blues.map(v => v.name)
      },
      yAxis: {},
      series: [{
        name: '次数',
        type: 'bar',
        data: blues.map(v => v.value)
      }],
      color: ['#3399ff']
    })
  }

  const setRedDisOption = (reds: ChartOption[], redDisList: ChartOption[][]) => {
    const series = redDisList.map((item, i) => {
      return {
        name: `红球${i + 1}`,
        type: 'line',
        smooth: true,
        showSymbol: false,
        symbol: 'circle',
        symbolSize: 6,
        data: item.map(v => v.value)
      }
    })
    chartRef.current && Echart.init(chartRef.current).setOption({
      title: {
        text: '红球分布图'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // lineStyle: {
          //     color: '#ddd'
          // }
        },
        backgroundColor: 'rgba(255,255,255,1)',
        // padding: [5, 10],
        textStyle: {
          color: '#7588E4',
        },
        extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
      },
      grid: {
        left: '2%',
        right: '2%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        data: reds.map(v => v.name)
      },
      yAxis: {},
      legend: {
        right: 20,
        orient: 'horizontal',
        data: ['红球1', '红球2', '红球3', '红球4', '红球5', '红球6']
      },
      series: series,
      // color: ['#f54646','#f5464685','#f5464670','#f5464655','#f5464640','#f5464625']
      color: ['#f54646', '#c23531', '#2f4554', '#61a0a8', '#d48265', '#6e7074', '#749f83',  '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']
    })
  }

  const setOptions = ({reds, blues, redDisList}: BallChart) => {
    setRedOption(reds)
    setBlueOption(blues)
    setRedDisOption(reds, redDisList)
  }

  const onQuery = () => {
    setLoading(true)
    useGraphQL<BallChart>(query).then(setOptions).finally(() => setLoading(false))
  }

  useEffect(() => {
    onQuery()
  }, [])

  return {
    redRef,
    blueRef,
    chartRef,
    loading,
  }
}
