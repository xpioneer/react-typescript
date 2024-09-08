import { useState, useEffect } from 'react'
import { Form } from 'antd'
import { Ball } from 'models/ball'
import { data2AntPageData } from '@/utils/tools'
import { useGraphQL } from 'services/http'

const query = `
query ballPages($page: Int, $pageSize: Int, $order: pageOrder, $issue: String, $drawDate: [String]){
  balls(page: $page, pageSize: $pageSize, order: $order, issue: $issue, drawDate: $drawDate){
    list{id,issue,red1,red2,red3,red4,red5,red6,reds,blue,drawDate}
    meta{current,total,pageSize}
  }
}`

export enum LatestRange {
  Top40 = 40,
  Top60 = 60,
  Top100 = 100,
}

export const useList = () => {
  const [form] = Form.useForm()
  
  const [loading, setLoading] = useState(false)
  const [pageData, setPageData] = useState(data2AntPageData<Ball>())

  const onQuery = (page = 1, pageSize = 40, order = {createdAt: 'DESC'}) => {
    const vals = form.getFieldsValue()
    setLoading(true)
    useGraphQL<{balls: Ball}, true>(
      query,
      {
        ...vals,
        page,
        pageSize,
        order,
      }
    ).then(res => {
      setPageData(data2AntPageData(res.balls))
    }).finally(() => setLoading(false))
  }

  useEffect(() => {
    onQuery()
  }, [])

  return {
    form,
    loading,
    pageData,
    onQuery,
  }
}
