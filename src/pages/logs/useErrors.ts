import { useState, useEffect } from 'react'
import { Form } from 'antd'
import { startOfDay, endOfDay } from 'date-fns'
import { ErrorLog, ErrorQuery } from 'types/apiError'
import { data2PageData, pageData2Params, data2AntPageData } from '@/utils/tools'
import { getErrorLogs } from 'services/api'


export const useErrors = () => {
  const [form] = Form.useForm<ErrorQuery>()
  
  const [data, setData] = useState<ErrorLog>()
  const [loading, setLoading] = useState(false)
  const [pageData, setPageData] = useState(data2PageData<ErrorLog>())

  const onQuery = (page = 1, pageSize = 10) => {
    const params = {
      page,
      pageSize,
    }
    const vals = form.getFieldsValue()
    if(vals._createdAt) {
      vals.createdAt = vals._createdAt.map((d, i) => i > 0 ? endOfDay(d) : startOfDay(d)).join(',')
      vals._createdAt = undefined
    }
    setLoading(true)
    getErrorLogs({...params, ...vals}).then(res => {
      setPageData(data2PageData(res))
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
    data,
    setData,
  }
}