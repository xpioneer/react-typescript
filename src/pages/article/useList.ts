import { useState, useEffect } from 'react'
import { Form } from 'antd'
import { QueryForm } from '@/types/articleType'
import { IArticle } from 'models/article'
import { data2AntPageData } from '@/utils/tools'
import { useGraphQL } from '@/services/http'

const query = `
query articlePages($page: Int, $pageSize: Int, $order: pageOrder, $title: String, $abstract: String, $tag: String, $createdAt: [String]){
  articles(page: $page, pageSize: $pageSize, order: $order, title: $title, abstract: $abstract, tag: $tag, createdAt: $createdAt){
    list{id,title,abstract,createdAt,createdBy}
    meta{current,total,pageSize}
  }
}`

export const useList = () => {
  const [form] = Form.useForm()
  
  const [loading, setLoading] = useState(false)
  const [pageData, setPageData] = useState(data2AntPageData<IArticle>())

  const onQuery = (page = 1, pageSize = 10, order = {createdAt: 'DESC'}) => {
    const vals = form.getFieldsValue()
    setLoading(true)
    useGraphQL<{articles: IArticle}, true>(
      query,
      {
        page,
        pageSize,
        order,
        ...vals
      }
    ).then(res => {
      setPageData(data2AntPageData(res.articles))
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
