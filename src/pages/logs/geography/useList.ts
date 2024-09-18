import { useState, useEffect } from 'react'
import { Form } from 'antd'
import { startOfDay, endOfDay } from 'date-fns'
import { SystemLog } from 'types/geolog'
import { data2PageData, pageData2Params, data2AntPageData } from '@/utils/tools'
import { getGeologs } from 'services/geography'


export const useList = () => {
  const [form] = Form.useForm()

  const [loading, setLoading] = useState(false)
  const [pageData, setPageData] = useState(data2PageData<SystemLog>())

  const onQuery = (page = 1, pageSize = 10) => {
    const params = {
      page,
      pageSize,
    }
    const vals = form.getFieldsValue()
    setLoading(true)
    getGeologs({...params, ...vals}).then(res => {
      setPageData(data2PageData(res))
    }).finally(() => setLoading(false))
  }

  useEffect(() => {
    // onQuery()
  }, [])

  return {
    form,
    loading,
    pageData,
    onQuery,
  }
}