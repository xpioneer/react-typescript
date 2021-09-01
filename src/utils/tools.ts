import { format } from "date-fns"
import { EDateFormat } from "types/base"

export const object2Str = (o: string|object): string => {
  return typeof o === 'string' ? o : JSON.stringify(o)
}

export const storage = {
  get: (key: string) => {
    const value = localStorage.getItem(key)
    return JSON.parse(value)
  },

  set: (key: string, value: any): void => {
    if (value !== null && value !== undefined) {
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
  meta: { page: 1, pageSize: 10, total: 0, count: 0 }
}): IPageData<T> => {
  return {
    ...data,
    meta: {
      ...data.meta,
      showTotal: total => `共${total}条，本页${data.meta.count}条`
    }
    
  }
}

export const pageData2Params = (meta: Partial<IPager> = {page: 1, pageSize: 10}): Pick<IPager, 'page' | 'pageSize'> => {
  return {
    page: meta.page,
    pageSize: meta.pageSize
  }
}


export const object2Options = <T, K extends keyof T>(obj: T, keys: K[] = Object.keys(obj) as K[], noNum = true) => {
  return keys.filter(key => noNum ? isNaN(+key) : true).map(key => ({
    label: key,
    value: obj[key]
  }))
}

export const dateFormat = (date: number | string | Date, pattern = EDateFormat.Date) => {
  let str = ''
  try {
    const _date = new Date(date)
    console.log(_date, '-----')
    if(!isNaN(+_date)) {
      str = format(_date, pattern)
    }
  } catch(e) {
    // 
  }
  return str
}