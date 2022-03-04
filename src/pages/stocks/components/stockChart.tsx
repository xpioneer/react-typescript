import React, { useState, useEffect, useRef } from 'react'
import { Row, Col, Form, Spin } from 'antd'
import * as Echart from 'echarts/core'
import {
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  TitleComponentOption,
  TooltipComponentOption,
  LegendComponentOption
} from 'echarts/components'
import { PieChart, PieSeriesOption } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { LabelLayout } from 'echarts/features'
import { getStockChartCount } from '../../../services/stock'
import { EBlock } from 'types/stock'

Echart.use([
  PieChart,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  CanvasRenderer,
  LabelLayout
])

type EchartsOption = Echart.ComposeOption<
TitleComponentOption |
TooltipComponentOption |
LegendComponentOption |
PieSeriesOption>

export const StockChart: React.FC = () => {

  const chartRef = useRef<HTMLDivElement>()

  useEffect(() => {
    const stockChart = Echart.init(chartRef.current)
    let options: EchartsOption
    getStockChartCount().then(res => {
      options = {
        title: {
          text: 'Stock Blocks',
          subtext: 'China A-Share Market',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Block',
            type: 'pie',
            radius: '50%',
            data: res.map(i => ({name: EBlock[i.block], value: i.total}))
          },
          {
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0,0,0,0.5)'
              }
            }
          }
        ]
      }
      stockChart.setOption(options)
    })
  }, [])


  return <Row className="mgb8">
    <Col span={24}>
      <div className='chart-w' ref={chartRef}></div>
    </Col>
  </Row>
}
