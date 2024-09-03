import { useState, useEffect, useRef } from 'react'
import { Form } from 'antd'
import { IArticleType } from 'models/articleType'
import { ITag } from 'models/tag'
import { IArticle, ArticlesData } from 'models/article'
import { data2AntPageData } from '@/utils/tools'
import { useGraphQL } from '@/services/http'

const query = `
query articlePages($page: Int, $pageSize: Int, $order: pageOrder, $title: String, $abstract: String, $tag: String, $createdAt: [String]){
  articles(page: $page, pageSize: $pageSize, order: $order, title: $title, abstract: $abstract, tag: $tag, createdAt: $createdAt){
    list{id,title,abstract,createdAt,typeId,tag,createdBy}
    meta{current,total,pageSize}
  }
  articleTypes(page: 1, pageSize: 99){
    list{id,name}
  }
  tags(page: 1, pageSize: 99){
    list{id,name}
  }
}`

export const useList = () => {
  const [form] = Form.useForm()
  
  const [loading, setLoading] = useState(false)
  const [pageData, setPageData] = useState(data2AntPageData<IArticle>())

  const optsRef = useRef<{
    types: IArticleType[]
    tags: ITag[]
  }>({
    types: [],
    tags: [],
  })

  const onQuery = (page = 1, pageSize = 10, order = {createdAt: 'DESC'}) => {
    const vals = form.getFieldsValue()
    setLoading(true)
    useGraphQL<ArticlesData>(
      query,
      {
        page,
        pageSize,
        order,
        ...vals
      }
    ).then(res => {
      setPageData(data2AntPageData(res.articles))
      // 减少渲染，谨慎使用
      optsRef.current = {
        types: res.articleTypes.list,
        tags: res.tags.list,
      }
    }).finally(() => setLoading(false))
  }

  useEffect(() => {
    onQuery()
  }, [])

  return {
    form,
    optsRef,
    loading,
    pageData,
    onQuery,
  }
}
