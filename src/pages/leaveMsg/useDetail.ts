import { Form } from 'antd'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { LeaveMsg } from '@models/leaveMsg'
import { useGraphQL } from '@/services/http'

const query = `
query getLeaveMsg($id: String!){
  leaveMsg(id: $id){
    id
    description
    ip
    createdAt
  }
}`


export const useDetail = () => {
  const {id} = useParams<{id: string}>()

  const [form] = Form.useForm<LeaveMsg>()

  const [loading, setLoading] = useState(false)
  

  const isEdit = !!Form.useWatch('id', form)
  
  const onSave = (vals: LeaveMsg) => {
    // setLoading(true)
    // useGraphQL<{id: string}>(
    //   mutation,
    //   vals
    // ).finally(() => setLoading(false))
  }

  const onQuery = () => {
    setLoading(true)
    useGraphQL<{leaveMsg: LeaveMsg}>(
      query,
      { id }
    ).then(res => form.setFieldsValue(res.leaveMsg))
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
