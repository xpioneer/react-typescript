import { useState, useEffect } from 'react'
import { Form } from 'antd'
import { QueryForm } from '@/types/articleType'
import { IBall } from 'models/ball'
import { data2AntPageData } from '@/utils/tools'
import { useGraphQL } from '@/services/http'

const query = `
query ballPages($page: Int, $pageSize: Int, $order: pageOrder, $issue: String, $drawDate: [String]){
  balls(page: $page, pageSize: $pageSize, order: $order, issue: $issue, drawDate: $drawDate){
    list{id,issue,red1,red2,red3,red4,red5,red6,blue,pool,prizeOne,prizeOneNum,prizeTwo,prizeTwoNum,bettingNum,drawDate,createdAt}
    meta{current,total,pageSize}
  }
}`

const mutation = `
mutation delete($id: String!){
  delBall(id: $id)
}`

export const useList = () => {
  const [form] = Form.useForm()
  
  const [loading, setLoading] = useState(false)
  const [pageData, setPageData] = useState(data2AntPageData<IArticle>())

  const onQuery = (page = 1, pageSize = 20, order = {createdAt: 'DESC'}) => {
    const vals = form.getFieldsValue()
    setLoading(true)
    useGraphQL<{balls: IBall}, true>(
      query,
      {
        page,
        pageSize,
        order,
        ...vals
      }
    ).then(res => {
      setPageData(data2AntPageData(res.balls))
    }).finally(() => setLoading(false))
  }

  const onDelete = (id: string) => {
    return useGraphQL<boolean>(
      mutation,
      { id }
    ).then(() => {
      onQuery()
    })
  }

  useEffect(() => {
    onQuery()
  }, [])

  return {
    form,
    loading,
    pageData,
    onQuery,
    onDelete,
  }
}
