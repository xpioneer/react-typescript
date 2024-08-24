import { Form } from 'antd'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { GRAPHQL_API } from '@/constants'
import { ITag } from '@models/tag'
import { useGraphQL } from '@/services/graphql'

const query = `
query getTag($id: String!){
  tag(id: $id){
    id
    name
    remark
    createdAt
    updatedAt
  }
}`

const mutation = `
mutation updateTag($id: String, $name: String!, $remark: String){
  editTag(id: $id, name: $name, remark: $remark){
    id
  }
}`


export const useDetail = () => {
  const {id} = useParams<{id: string}>()

  const [form] = Form.useForm<ITag>()

  const [loading, setLoading] = useState(false)

  const isEdit = !!Form.useWatch('id', form)
  
  const onSave = (vals: ITag) => {
    setLoading(true)
    useGraphQL<ITag>(
      mutation,
      vals
    ).finally(() => setLoading(false))
  }

  const onQuery = () => {
    setLoading(true)
    useGraphQL<ITag>(
      query,
      { id }
    ).then(form.setFieldsValue)
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
