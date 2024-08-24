
import { useState, useEffect } from 'react'
import { Form } from 'antd'
import { serialize } from '@utils/params'
import { startOfDay, endOfDay } from 'date-fns'
import { GRAPHQL_API } from '@constants/index'
import { ITag } from 'models/tag'
import { QueryForm } from 'types/articleType'
import { data2AntPageData } from '@/utils/tools'
import { useGraphQL } from '@/services/graphql'


const queryTagPages = `
query articleTags($page: Int, $pageSize: Int, $order: pageOrder, $name: String, $createdAt: [String]){
  tags(page: $page, pageSize: $pageSize, order: $order, name: $name, createdAt: $createdAt){
    list{id,name,remark,createdAt,createdBy,updatedAt}
    meta{current,total,pageSize}
  }
}`

export const useTag = () => {
  const [form] = Form.useForm<QueryForm>()
  
  const [loading, setLoading] = useState(false)
  const [pageData, setPageData] = useState(data2AntPageData<ITag>())

  const onQuery = (page = 1, pageSize = 10) => {
    const params = {
      page,
      pageSize,
    }
    const vals = form.getFieldsValue()
    setLoading(true)
    useGraphQL<'tags', ITag, boolean>(
      queryTagPages,
      {
        ...params,
        ...vals
      }
    ).then(res => {
      setPageData(data2AntPageData(res))
    }).finally(() => setLoading(false))
  }

  useEffect(onQuery, [])

  return {
    form,
    loading,
    pageData,
    onQuery,
  }
}
