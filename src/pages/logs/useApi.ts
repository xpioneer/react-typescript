import { useState, useEffect } from 'react'
import { Form } from 'antd'
import { startOfDay, endOfDay } from 'date-fns'
import { APILog, APIQuery } from 'types/api'
import { data2PageData, pageData2Params, data2AntPageData } from '@/utils/tools'
import { getApiLogs } from 'services/api'


export const useApi = () => {
  const [form] = Form.useForm<APIQuery>()
  
  const [loading, setLoading] = useState(false)
  const [pageData, setPageData] = useState(data2PageData<APILog>())

  const onQuery = (page = 1, pageSize = 10) => {
    const params = {
      page,
      pageSize,
    }
    const vals = form.getFieldsValue()
    setLoading(true)
    getApiLogs({...params, ...vals}).then(res => {
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
  }
}