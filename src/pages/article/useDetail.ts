import { Form } from 'antd'
import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Article, ArticlesData } from 'models/article'
import { ArticleType } from 'models/articleType'
import { Tag } from 'models/tag'
import { useGraphQL } from '@/services/http'
import { parseISO } from 'date-fns'

const query = `
query article($id: String){
  article(id: $id){
    id,title,abstract,description,isTop,tag,createdAt,createdBy,
    typeId
  }
  articleTypes(page: 1, pageSize: 99){
    list{id,name}
  }
  tags(page: 1, pageSize: 99){
    list{id,name}
  }
}`

const mutation = `
mutation upateArticle($id: String, $title: String!, $abstract: String!, $typeId: String!, $description: String!, $isTop: Int, $tag: String!,){
  editArticle(id: $id, title: $title, abstract: $abstract, typeId: $typeId, description: $description, isTop: $isTop, tag: $tag){
    id
  }
}`


// type ResData = {
//   article: Article
//   articleTypes: {
//     list: ArticleType[]
//   }
//   tags: {
//     list: Tag[]
//   }
// }

const mapData = (data: Article, save = false) => {
  if(save) {
    (data as any).tag = data.tag.join(',');
    (data as any).createdAt = undefined
  } else {
    (data as any).createdAt = parseISO(data.createdAt);
    data.tag = (data as any).tag.split(',')
  }
  
  return data
}

export const useDetail = () => {
  const {id} = useParams<{id: string}>()

  const [form] = Form.useForm<Article>()

  const [loading, setLoading] = useState(false)

  const optsRef = useRef<{
    types: ArticleType[]
    tags: Tag[]
  }>({
    types: [],
    tags: [],
  })

  const isEdit = !!Form.useWatch('id', form)
  
  const onSave = (vals: Article) => {
    const variables = mapData(vals, true)
    setLoading(true)
    return useGraphQL<boolean>(
      mutation,
      variables
    ).finally(() => setLoading(false))
  }

  const onQuery = () => {
    setLoading(true)
    useGraphQL<ArticlesData>(
      query,
      { id }
    ).then(res => {
      const article = res.article;
      if(article) {
        form.setFieldsValue(mapData(article))
      }
      // 减少渲染，谨慎使用
      optsRef.current = {
        types: res.articleTypes.list,
        tags: res.tags.list,
      }
    })
    .finally(() => setLoading(false))
  }

  useEffect(() => {
    onQuery()
  }, [id])

  return {
    form,
    optsRef,
    loading,
    isEdit,
    onQuery,
    onSave,
  }
}
