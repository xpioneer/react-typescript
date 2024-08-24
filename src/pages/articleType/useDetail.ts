import { Form } from 'antd'
import { useState, useEffect } from 'react'
import { GRAPHQL_API } from '@/constants'
import { IArticleType } from 'models/articleType'
import { useGraphQL } from '@/services/graphql'

const getArticleTypeById = `
query getArticleType($id: String!){
  articleType(id: $id){
    id
    name
    remark
    createdAt
  }
}`

const postArticleType = `
mutation updateArticleType($id: String!, $name: String!, $remark: String){
  editArticleType(id: $id, name: $name, remark: $remark){
    id
  }
}`


const useArticleTypeDetail = () => {
  const [form] = Form.useForm<any>()

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<IArticleType>()
  
  const onQuery = (page = 1, pageSize = 10) => {
    const params = {
      page,
      pageSize,
    }
    const vals = form.getFieldsValue()
    setLoading(true)
    useGraphQL<'articleType', IArticleType>(
      getArticleTypeById,
      {
        ...params,
        ...vals
      }
    ).then(res => {
      setData(res)
    }).finally(() => setLoading(false))
  }

  useEffect(onQuery, [])

  return {
    form,
    loading,
    data,
    onQuery,
  }

  // @observable loading: boolean = false
  // @observable mainData: any = {} // articleType detail data

  // @action getDetail = (id: string) => {
  //   $http.post(GRAPHQL_API, {
  //     query: getArticleTypeById,
  //     variables: {id}
  //   }).then((res: any) => {
  //     const {articleType} = res.data
  //     runInAction(() => {
  //       this.mainData = articleType
  //       this.loading = false
  //     })
  //   }, err => {
  //     runInAction(() => {
  //       this.loading = false
  //     })
  //   })
  // }

  // @action update = (cb: Function) => {
  //   this.loading = true

  //   $http.post('/graphql', {
  //     query: postArticleType,
  //     variables: this.mainData
  //   }).then((res: any) => {
  //     const {editArticleType: {id}} = res.data
  //     runInAction(() => {
  //       this.loading = false

  //       this.getDetail(this.mainData.id)
  //     })
  //   }, err => {
  //     runInAction(() => {
  //       this.loading = false
  //     })
  //   })
  // }

  // @action inputChange = (value: string, type: string) => {
  //   this.mainData[type] = value.trim()
  // }

}
