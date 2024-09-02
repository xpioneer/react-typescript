import { Form } from 'antd'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { GRAPHQL_API } from '@/constants'
import { IArticleType } from 'models/articleType'
import { useGraphQL } from '@/services/http'

const query = `
query getArticleType($id: String!){
  articleType(id: $id){
    id
    name
    remark
    createdAt
    updatedAt
  }
}`

// 这里放开了id的限制，update和insert共用一个mutation，后面再改。
const mutation = `
mutation updateArticleType($id: String, $name: String!, $remark: String){
  editArticleType(id: $id, name: $name, remark: $remark){
    id
  }
}`


export const useArticleTypeDetail = () => {
  const {id} = useParams<{id: string}>()

  const [form] = Form.useForm<IArticleType>()

  const [loading, setLoading] = useState(false)

  const isEdit = !!Form.useWatch('id', form)
  
  const onSave = (vals: IArticleType) => {
    setLoading(true)
    useGraphQL<{id: string}>(
      mutation,
      {
        ...vals
      }
    ).finally(() => setLoading(false))
  }

  const onQuery = () => {
    setLoading(true)
    useGraphQL<{articleType: IArticleType}>(
      query,
      {
        id,
      }
    ).then(res => form.setFieldsValue(res.articleType))
    .finally(() => setLoading(false))
  }

  useEffect(() => {
    if(id) {
      onQuery()
    }
  }, [id])

  return {
    form,
    loading,
    isEdit,
    onQuery,
    onSave,
  }
}
