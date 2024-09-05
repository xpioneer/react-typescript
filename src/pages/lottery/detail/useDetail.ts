import { useState, useEffect } from 'react'
import { Form } from 'antd'
import { useParams, useNavigate } from 'react-router-dom'
import { debounce } from 'utils/debounce'
import { QueryForm } from '@/types/articleType'
import { IBall } from 'models/ball'
import { parseISO } from 'date-fns'
import { useGraphQL } from 'services/http'

const mutation = `
mutation saveBall($input: ballInput!){
  saveBall(input: $input)
}`

const createBall = `
mutation createBall($input: ballInput!){
  ball(input: $input){id}
}`

const query = `
query ball($id: String!){
  ball(id: $id){id,issue,reds,blue,pool,prizeOne,prizeOneNum,prizeTwo,prizeTwoNum,bettingNum,drawDate,createdAt}
}`

const updateBall = `
mutation updateBall($input: ballInput!){
  updated:editBall(input: $input)
}`

const mapData = (data: IBall, save = false) => {
  if(save) {
    data.blue = (data.blue as number[])[0];
    (data as any).createdAt = undefined
  } else {
    (data as any).drawDate = parseISO(data.drawDate);
    (data as any).createdAt = parseISO(data.createdAt);
    data.blue = [data.blue as number]
  }
  
  return data
}

export const useDetail = () => {
  const {id} = useParams<{id: string}>()
  const navigate = useNavigate()

  const [form] = Form.useForm<IBall>()

  const [loading, setLoading] = useState(false)

  const isEdit = !!Form.useWatch('id', form)
  
  const onSave = debounce((vals: IBall) => {
    setLoading(true)
    useGraphQL<IBall>(
      mutation,
      { input: mapData(vals, true) }
    ).then(r => history.go(-1))
    .finally(() => setLoading(false))
  })


  const onQuery = () => {
    setLoading(true)
    useGraphQL<IBall>(
      query,
      {
        id,
      }
    ).then(r => form.setFieldsValue(mapData(r)))
    .finally(() => setLoading(false))
  }

  useEffect(() => {
    if(id) {
      onQuery()
    }
  }, [id])

  return {
    form,
    isEdit,
    loading,
    onQuery,
    onSave,
  }
}
