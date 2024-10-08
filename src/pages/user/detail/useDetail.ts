import { Form } from 'antd'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { User } from 'models/user'
import { useGraphQL } from '@/services/http'

const query = `
query getUser($id: String!){
  user(id: $id){
    id
    username
    nickName
    userType
    sex
    createdAt
    updatedAt
    remark
  }
}`

// 这里放开了id的限制，update和insert共用一个mutation，后面再改。
const mutation = `
mutation saveUser($id: String, $username: String, $nickName: String!, $password: String, $userType: Int!, $sex: Int!, $remark: String){
  editUser(id: $id, username: $username, nickName: $nickName, password: $password, userType: $userType, sex: $sex, remark: $remark){id}
}`


export const useUserDetail = () => {
  const {id} = useParams<{id: string}>()

  const [form] = Form.useForm<User>()

  const [loading, setLoading] = useState(false)

  const isEdit = !!Form.useWatch('id', form)
  
  const onSave = (vals: User) => {
    setLoading(true)
    return useGraphQL<{id: string}>(
      mutation,
      {
        ...vals
      }
    ).finally(() => setLoading(false))
  }

  const onQuery = () => {
    setLoading(true)
    useGraphQL<{user: User}>(
      query,
      {
        id,
      }
    ).then(res => form.setFieldsValue(res.user))
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
