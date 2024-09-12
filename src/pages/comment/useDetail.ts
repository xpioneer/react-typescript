import { Form } from 'antd'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Comment } from '@models/comment'
import { useGraphQL } from '@/services/http'

const query = `
query getComment($id: String!){
  comment(id: $id){
    id
    description
    ip
    client
    createdAt
    updatedAt
  }
}`


export const useDetail = () => {
  const {id} = useParams<{id: string}>()

  const [form] = Form.useForm<Comment>()

  const [loading, setLoading] = useState(false)
  

  const isEdit = !!Form.useWatch('id', form)
  
  const onSave = (vals: Comment) => {
    // setLoading(true)
    // useGraphQL<{id: string}>(
    //   mutation,
    //   vals
    // ).finally(() => setLoading(false))
  }

  const onQuery = () => {
    setLoading(true)
    useGraphQL<{comment: Comment}>(
      query,
      { id }
    ).then(res => form.setFieldsValue(res.comment))
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
