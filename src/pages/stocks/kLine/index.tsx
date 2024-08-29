import { Spin, Form } from 'antd'
import React, { useState, useEffect, useRef } from 'react'
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
  DataZoomComponentOption
} from 'echarts/components'
import {
  CandlestickChart,
  CandlestickSeriesOption,
  BarChart,
  BarSeriesOption
} from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { debounce } from 'utils/debounce'
import { data2AntPageData } from '@/utils/tools'

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
>

const DayKLineChart: React.FC<{id: string}> = ({id}) => {

  const chartRef = useRef<HTMLDivElement>(null)

  const [form] = Form.useForm()

  const [loading, setLoading] = useState(false)
  const [pageData, setPageData] = useState(data2AntPageData<any>({
    data: [],
    meta: {page: 1, pageSize: 10, total: 0}
  }))
  const [stockOpts, setStockOpts] = useState<IOption<number>[]>([])
  const [total, setTotal] = useState(0)

  const onQuery = () => {
    const vals = form.getFieldsValue()
    if(!vals.id) {
      return
    }
    setLoading(true)
    // stockHistoryPageList({...params, ...vals, }).then(res => {
    //   const data = data2PageData(res)
    //   setPageData(data)
    // }).finally(() => setLoading(false))
  }

  const onSelectSearch = debounce((v: string) => {
    if(!v.trim()) {
      return
    }
    // stockPageList({
    //   code: v,
    //   name: v,
    //   page: 1,
    //   pageSize: 100,
    //   noPage: true
    // }).then(res => {
    //   const list = res.data.map<IOption<number>>(item => ({value: item.id, label: item.name}))
    //   console.log(res, 'res===', list)
    //   setStockOpts(list)
    // })
  }, 500)

  useEffect(() => {
    // onQuery()
    // stockHistoryTotal().then(setTotal)
  }, [])

  return <Spin spinning={loading}>
    <div ref={chartRef}></div>
  </Spin>
}

export default DayKLineChart
