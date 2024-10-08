import { useState, useEffect } from 'react'
import { Form } from 'antd'
import { User } from 'models/user'
import { data2AntPageData } from '@/utils/tools'
import { useGraphQL } from '@/services/http'

const query = `
query userPages($page: Int, $pageSize: Int, $order: pageOrder, $nickName: String, $username: String, $userType: Int, $createdAt: [String]){
  users(page: $page, pageSize: $pageSize, order: $order, nickName: $nickName, username: $username, userType: $userType, createdAt: $createdAt){
    list{id,nickName,username,userType,remark,sex,createdAt,updatedAt}
    meta{current,total,pageSize}
  }
}`

export const useList = () => {
  const [form] = Form.useForm()
  
  const [loading, setLoading] = useState(false)
  const [pageData, setPageData] = useState(data2AntPageData<User>())

  const onQuery = (page = 1, pageSize = 10, order: AnyObject = {createdAt: 'DESC'}) => {
    const vals = form.getFieldsValue()
    setLoading(true)
    useGraphQL<{users: User}, true>(
      query,
      {
        page,
        pageSize,
        order,
        ...vals
      }
    ).then(res => {
      setPageData(data2AntPageData(res.users))
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
