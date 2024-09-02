import { useState, useEffect } from 'react'
import { Form } from 'antd'
import { GRAPHQL_API } from '@constants/index'
import { QueryForm } from '@/types/articleType'
import { ILeaveMsg } from 'models/leaveMsg'
import { data2AntPageData } from '@/utils/tools'
import { useGraphQL } from '@/services/http'

const query = `
query leaveMsgPages($page: Int, $pageSize: Int, $order: pageOrder, $description: String, $createdAt: [String]){
  leaveMsgs(page: $page, pageSize: $pageSize, order: $order, description: $description, createdAt: $createdAt){
    list{id,description,ip,createdAt}
    meta{current,total,pageSize}
  }
}`

export const useList = () => {
  const [form] = Form.useForm<QueryForm>()
  
  const [loading, setLoading] = useState(false)
  const [pageData, setPageData] = useState(data2AntPageData<ILeaveMsg>())

  const onQuery = (page = 1, pageSize = 10, order = {createdAt: 'DESC'}) => {
    const vals = form.getFieldsValue()
    setLoading(true)
    useGraphQL<{leaveMsgs: ILeaveMsg}, true>(
      query,
      {
        page,
        pageSize,
        order,
        ...vals
      }
    ).then(res => {
      setPageData(data2AntPageData(res.leaveMsgs))
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
