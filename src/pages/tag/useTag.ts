import { useState, useEffect } from 'react'
import { Form } from 'antd'
import { Tag } from '@models/tag'
import { data2AntPageData } from '@/utils/tools'
import { useGraphQL } from '@/services/http'


const query = `
query articleTags($page: Int, $pageSize: Int, $order: pageOrder, $name: String, $createdAt: [String]){
  tags(page: $page, pageSize: $pageSize, order: $order, name: $name, createdAt: $createdAt){
    list{id,name,remark,createdAt,createdBy,updatedAt}
    meta{current,total,pageSize}
  }
}`

export const useTag = () => {
  const [form] = Form.useForm()
  
  const [loading, setLoading] = useState(false)
  const [pageData, setPageData] = useState(data2AntPageData<Tag>())

  const onQuery = (page = 1, pageSize = 10) => {
    const params = {
      page,
      pageSize,
    }
    const vals = form.getFieldsValue()
    setLoading(true)
    useGraphQL<{tags: Tag}, true>(
      query,
      {
        ...params,
        ...vals
      }
    ).then(res => {
      setPageData(data2AntPageData(res.tags))
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
