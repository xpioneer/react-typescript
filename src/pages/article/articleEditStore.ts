import { observable, action, autorun, runInAction, computed } from 'mobx';
import { GRAPHQL_API } from '@constants/index'

const getArticleById = `
query article($id: String){
  article(id: $id){
    id,title,abstract,description,isTop,tag,createdAt,createdBy,
    typeId
  }
  articleTypes(page: 1, pageSize: 99){
    list{id,name}
  }
  tags(page: 1, pageSize: 99){
    list{id,name}
  }
}`
const updateArticle = `
mutation upateArticle($id: String!, $title: String!, $abstract: String!, $typeId: String!, $description: String!, $isTop: Int, $tag: String!,){
  editArticle(id: $id, title: $title, abstract: $abstract, typeId: $typeId, description: $description, isTop: $isTop, tag: $tag){
    id
  }
}`

class articleEditStore {
  @observable loading: boolean = false
  @observable mainData: any = {} // article detail data
  @observable typeList: any[] = [] // all article type list
  @observable tagList: any[] = [] // all tag list
  @observable createdAt: string = ''

  @action getDetail = (id: string) => {
    this.loading = true

    $http.post(GRAPHQL_API, {
      query: getArticleById,
      variables: {id}
    }).then((res: any) => {
      const {article, articleTypes, tags } = res.data
      const typeList = articleTypes ? articleTypes.list : []
      const tagList = tags ? tags.list : []

      runInAction(() => {
        this.loading = false
        this.mainData = article || {}
        this.typeList = typeList
        this.tagList = tagList.map((t: any) => ({label: t.name, value: t.name}))
      })
    }, err => {
      runInAction(() => {
        this.loading = false
      })
    })
  }

  @action inputChange = (value: string, type: string) => {
    this.mainData[type] = value
  }

  @action tagChange = (value: string[]) => {
    this.mainData['tag'] = value.join(',')
  }

  @action update = () => {
    $http.post('/graphql', {
      query: updateArticle,
      variables: this.mainData
    }).then((res: any) => {
      runInAction(() => {
        this.loading = false
        this.getDetail(this.mainData.id)
      })
    }, err => {
      runInAction(() => {
        this.loading = false
      })
    })
  }

}

export default new articleEditStore()