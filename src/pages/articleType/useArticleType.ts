import { useState, useEffect } from 'react'
import { Form } from 'antd'
import { ArticleType } from '@models/articleType'
import { data2AntPageData } from '@/utils/tools'
import { useGraphQL } from '@/services/http'

const queryArticleTypes = `
query articleTypePages($page: Int, $pageSize: Int, $order: pageOrder, $name: String, $createdAt: [String]){
  articleTypes(page: $page, pageSize: $pageSize, order: $order, name: $name, createdAt: $createdAt){
    list{id,name,remark,createdAt,createdBy}
    meta{current,total,pageSize}
  }
}`

export const useArticleType = () => {
  const [form] = Form.useForm()
  
  const [loading, setLoading] = useState(false)
  const [pageData, setPageData] = useState(data2AntPageData<ArticleType>())

  const onQuery = (page = 1, pageSize = 10) => {
    const vals = form.getFieldsValue()
    setLoading(true)
    useGraphQL<{articleTypes: ArticleType}, true>(
      queryArticleTypes,
      {
        page,
        pageSize,
        ...vals
      }
    ).then(res => {
      setPageData(data2AntPageData(res.articleTypes))
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
