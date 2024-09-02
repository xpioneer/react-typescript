import { useState, useEffect } from 'react'
import { Form } from 'antd'
import { useParams, useHistory } from 'react-router-dom'
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
  const history = useHistory()

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


// class ballCreateStore {
//   @observable loading: boolean = false
//   @observable mainData: any = {} // tag detail data
//   redBalls: number[] = [
//     1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
//     11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
//     21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
//     31, 32, 33
//   ]
//   blueBalls: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
//   @observable reds: number[] = []
//   @observable blues: number[] = []

//   @action selectBall = (num: number, type: 'red' | 'blue') => {
//     if (type === 'red') {
//       let index = this.reds.findIndex(v => v === num)
//       if (index >= 0) { // selected, delete
//         this.reds.splice(index, 1)
//       } else { // not selected
//         if (this.reds.length < 6) { // and length < 6
//           this.reds.push(num)
//         }
//       }
//     } else {
//       this.blues[0] === num ? this.blues.splice(0, 1) : this.blues.splice(0, 1, num)
//     }
//   }

//   @action save = (cb: Function) => {
//     if (
//       /^\d{5}$/.test(this.mainData.issue) && 
//       this.reds.length === 6 &&
//       this.blues.length === 1 &&
//       /^\d+$/.test(this.mainData.pool) &&
//       /^\d+$/.test(this.mainData.prizeOne) &&
//       /^\d+$/.test(this.mainData.prizeOneNum) &&
//       /^\d+$/.test(this.mainData.prizeTwo) &&
//       /^\d+$/.test(this.mainData.prizeTwoNum) &&
//       /^\d+$/.test(this.mainData.bettingNum) && 
//       this.mainData.drawDate
//     ) {
//       let data = {
//         issue: this.mainData.issue,
//         reds: this.reds.sort((a, b) => a - b),
//         blue: this.blues[0],
//         pool: +this.mainData.pool,
//         prizeOne: +this.mainData.prizeOne,
//         prizeOneNum: +this.mainData.prizeOneNum,
//         prizeTwo: +this.mainData.prizeTwo,
//         prizeTwoNum: +this.mainData.prizeTwoNum,
//         bettingNum: +this.mainData.bettingNum,
//         drawDate: new Date(this.mainData.drawDate).toLocaleDateString(),
//       }

//       this.loading = true
//       $http.post(GRAPHQL_API, {
//         query: postBall,
//         variables: {input: data}
//       }).then((res: any) => {
//         // const {ball:{id}} = res.data
//         // cb(id)
//         window.history.go(-1)
//         runInAction(() => {
//           this.loading = false
//         })
//       }, err => {
//         runInAction(() => {
//           this.loading = false
//         })
//       })
//     } else {
//       $msg.warn('请检查数据填写完整性和格式')
//     }
    
//   }

//   @action inputChange = (value: string, type: string) => {
//     if (type === 'drawDate') {
//       this.mainData[type] = value
//     } else {
//       this.mainData[type] = value.trim()
//     }
//   }

// }

// export default new ballCreateStore()