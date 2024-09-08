import { Form } from 'antd'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Tag } from '@models/tag'
import { useGraphQL } from '@/services/http'

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

  const [form] = Form.useForm<Tag>()

  const [loading, setLoading] = useState(false)
  

  const isEdit = !!Form.useWatch('id', form)
  
  const onSave = (vals: Tag) => {
    setLoading(true)
    useGraphQL<{id: string}>(
      mutation,
      vals
    ).finally(() => setLoading(false))
  }

  const onQuery = () => {
    setLoading(true)
    useGraphQL<{tag: Tag}>(
      query,
      { id }
    ).then(res => form.setFieldsValue(res.tag))
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
