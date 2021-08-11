
export const object2Str = (o: string|object): string => {
  return typeof o === 'string' ? o : JSON.stringify(o)
}

export const storage = {
  get:  (key: string) => {
    const value = localStorage.getItem(key)
    return JSON.parse(value)
  },

  set:  (key: string, value: any): void => {
    if(value !== null && value !== undefined) {
      localStorage.setItem(key, JSON.stringify(value))
    }
  },

  remove: (key: string): void => {
    localStorage.removeItem(key)
  },

  clear: (): void => {
    localStorage.clear()
  }
}


export const data2PageData = <T>(data: IPageData<T> = {
  data: [],
  meta: { page: 1, pageSize: 10, total: 0 }
}): IPageData<T> => {
  return {
    ...data,
    meta: {
      ...data.meta,
      showTotal: total => `共${total}条`
    }
    
  }
}

export const pageData2Params = (meta: Partial<IPageData['meta']> = {page: 1, pageSize: 10}): Pick<IPageData['meta'], 'page' | 'pageSize'> => {
  return {
    page: meta.page,
    pageSize: meta.pageSize
  }
}