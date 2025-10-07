import { useState, useEffect } from 'react'
import { Form } from 'antd'
import { Comment } from '@models/comment'
import { data2AntPageData } from '@/utils/tools'
import { useGraphQL } from '@/services/http'

const query = `
query commentPages($page: Int, $pageSize: Int, $order: pageOrder, $description: String, $createdAt: [String]){
  comments(page: $page, pageSize: $pageSize, order: $order, description: $description, createdAt: $createdAt){
    list{id,description,articleId,ip,createdAt,updatedAt}
    meta{current,total,pageSize}
  }
}`

export const useList = () => {
  const [form] = Form.useForm()
  
  const [loading, setLoading] = useState(false)
  const [pageData, setPageData] = useState(data2AntPageData<Comment>())

  const onQuery = (page = 1, pageSize = 10, order = {createdAt: 'DESC'}) => {
    const vals = form.getFieldsValue()
    setLoading(true)
    useGraphQL<{comments: Comment}, true>(
      query,
      {
        page,
        pageSize,
        order,
        ...vals
      }
    ).then(res => {
      setPageData(data2AntPageData(res.comments))
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
