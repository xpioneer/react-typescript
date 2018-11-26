import { observable, action, autorun, runInAction, computed } from 'mobx';
import { message } from 'antd'

const getArticleById = `query article($id: String){
  article(id: $id){
    id,title,abstract,description,isTop,createdAt,createdBy,
    typeId,articleType{id,name}
  }
  articleTypes(page: 1, pageSize: 99){
    list{id,name}
  }
  tags(page: 1, pageSize: 99){
    list{id,name}
  }
}`

class articleEditStore {
  @observable loading: boolean = false
  @observable mainData: any = {} // article detail data
  @observable typeList: any[] = [] // all article type list
  @observable tagList: any[] = [] // all tag list
  @observable createdAt: string = ''

  @computed get showTag () {
    const tag = this.tagList.filter((t: any) => {
      return t.id == this.mainData.typeId
    })[0] || {}
    return tag.name
  }
  

  @action getDetail = (id: string) => {
    this.loading = true

    $http.post('/graphql', {
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
        this.tagList = tagList
      })
    }, err => {
      runInAction(() => {
        this.loading = false
      })
      message.error(err[0].message)
    })
  }

  @action changeType = (value: string) => {
    this.mainData.typeId = value
  }

  @action edit = () => {
    console.log(this.mainData.typeId, this.typeList)
  }

}

export default new articleEditStore()