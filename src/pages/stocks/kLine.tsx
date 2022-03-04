import { Spin } from 'antd'
import React, { useState, useEffect, useRef } from 'react'
import * as echarts from 'echarts/core'
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
  DataZoomComponentOption
} from 'echarts/components'
import {
  CandlestickChart,
  CandlestickSeriesOption,
  BarChart,
  BarSeriesOption
} from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
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

type EChartsOption = echarts.ComposeOption<
| DatasetComponentOption
| TitleComponentOption
| ToolboxComponentOption
| TooltipComponentOption
| GridComponentOption
| VisualMapComponentOption
| DataZoomComponentOption
| CandlestickSeriesOption
| BarSeriesOption
>

export const DayKLineChart: React.FC<{id: string}> = ({id}) => {

  const chartRef = useRef<HTMLDivElement>()

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({})

  useEffect(() => {
    const myChart = echarts.init(chartRef.current)
  }, [id])

  return <Spin spinning={loading}>
    <div ref={chartRef}></div>
  </Spin>
}
